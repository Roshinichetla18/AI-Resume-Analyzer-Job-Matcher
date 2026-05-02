from fastapi import FastAPI, UploadFile, File ,HTTPException
from fastapi.middleware.cors import CORSMiddleware



from models import User
from auth import hash_password, verify_password, create_token, SECRET_KEY, ALGORITHM

from fastapi.security import HTTPBearer
from jose import jwt


from utils import extract_text_from_pdf, extract_skills
from ml_model import predict_role

from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Resume

app = FastAPI()

origins = [
    "http://localhost:5173",          # local dev
    "https://your-app.vercel.app",    # your vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created"}


@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": db_user.email})

    return {"access_token": token}

security = HTTPBearer()

def get_current_user(token=Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)   # ✅ CORRECT
):
    file_bytes = await file.read()

    text = extract_text_from_pdf(file_bytes)

    role, score = predict_role(text)
    skills = extract_skills(text)

    db_resume = Resume(
        role=role,
        score=score,
        skills=", ".join(skills),
        user_email=user
    )

    db.add(db_resume)
    db.commit()

    return {
        "role": role,
        "score": score,
        "skills": skills
    }

@app.get("/history")
def get_history(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    data = db.query(Resume).filter(Resume.user_email == user).all()

    return [
        {
            "id": item.id,
            "role": item.role,
            "score": item.score,
            "skills": item.skills.split(", ")
        }
        for item in data
    ]
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# database.py  — add this at the bottom
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE resumes ADD COLUMN IF NOT EXISTS user_email VARCHAR"))
    conn.commit()
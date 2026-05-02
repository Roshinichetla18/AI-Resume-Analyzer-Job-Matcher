# 🚀 AI Resume Analyzer & Job Role Prediction System

A full-stack AI-powered web application that analyzes resumes, predicts suitable job roles, and extracts key skills using Machine Learning and NLP.

---

## 🌐 Live Demo

- **Frontend (Vercel):**  
  https://ai-resume-analyzer-job-matcher.vercel.app  

- **Backend API (Render):**  
  https://ai-resume-analyzer-job-matcher-j23p.onrender.com/docs  

---

## 📌 Overview

The AI Resume Analyzer automates resume screening using Natural Language Processing and Machine Learning.

Users can upload resumes (PDF), and the system:
- Extracts text  
- Predicts job role  
- Calculates match score  
- Identifies skills  
- Stores results for future access  

---

## ✨ Features

- 📄 Resume Upload (PDF)
- 🤖 ML-based Role Prediction
- 🧠 Skill Extraction
- 📊 Match Score Calculation
- 🔐 JWT Authentication
- 🗄️ PostgreSQL Database
- 📜 History Tracking
- 🎨 Responsive React UI
- 🌍 Fully Deployed Application

---

## 🧠 Machine Learning

- **Text Vectorization:** TF-IDF  
- **Model:** Logistic Regression  
- **Similarity:** Cosine Similarity  
- **Dataset:** Kaggle Resume Dataset  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  
- Bootstrap  

### Backend
- FastAPI  
- SQLAlchemy  

### Database
- PostgreSQL  

### Machine Learning
- Scikit-learn  
- Pandas  

### Authentication
- JWT (JSON Web Tokens)  
- Passlib (bcrypt hashing)

### Deployment
- Vercel (Frontend)  
- Render (Backend)

---

## ⚙️ Project Structure
AI-Resume-Analyzer-Job-Matcher/
│
├── backend/
│ ├── main.py
│ ├── models.py
│ ├── database.py
│ ├── auth.py
│ ├── ml_model.py
│ ├── utils.py
│ └── requirements.txt
│
├── frontend/
│ └── ai-resume/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Landing.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Signup.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── App.jsx
│ │ └── api.js
│
└── README.md



---

## 🔄 Workflow

1. User signs up / logs in  
2. Uploads resume (PDF)  
3. Backend:
   - Extracts text  
   - Runs ML model  
   - Extracts skills  
4. Returns:
   - Predicted role  
   - Match score  
   - Skills  
5. Stores results in database  
6. User can view history  

---

## 🔐 Authentication

- Secure password hashing using bcrypt  
- JWT token generation  
- Protected API routes  

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/AI-Resume-Analyzer-Job-Matcher.git

cd AI-Resume-Analyzer-Job-Matcher


---

### 2️⃣ Backend Setup

cd backend
pip install -r requirements.txt

Create `.env` file:

DATABASE_URL=your_postgres_url


Run backend:


uvicorn main:app --reload


---

### 3️⃣ Frontend Setup


cd frontend/ai-resume
npm install
npm run dev


---

## 🌍 Deployment

### Backend (Render)


gunicorn -k uvicorn.workers.UvicornWorker main:app

### Frontend (Vercel)

- Connected via GitHub  
- Uses deployed backend API  

---

## 📈 Future Improvements

- Resume vs Job Matching  
- Advanced NLP (BERT / Transformers)  
- Skill Gap Analysis  
- Resume Suggestions  
- Multi-language Support  

---

## 💡 Highlights

- End-to-end ML pipeline  
- Secure authentication  
- Real-world deployment  
- Full-stack integration  

---

## 🧑‍💻 Author

**Karthikeya Gaddam**  
B.Tech CSE (AI & ML)

---

## 📢 One-Line Summary

> Built a full-stack AI-powered resume analyzer using React, FastAPI, PostgreSQL, and Machine Learning for job role prediction and skill extraction.

---

⭐ If you like this project, consider giving it a star!

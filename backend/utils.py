import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes):
    text = ""
    pdf = fitz.open(stream=file_bytes, filetype="pdf")

    for page in pdf:
        text += page.get_text()

    return text

def extract_skills(text):
    skills_db = [
        "python", "react", "javascript", "html", "css",
        "fastapi", "django", "sql", "machine learning",
        "tensorflow", "numpy", "pandas"
    ]

    text = text.lower()
    return [skill for skill in skills_db if skill in text]
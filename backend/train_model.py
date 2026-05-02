import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("AI_Resume_Screening.csv")

# 🔥 Create TEXT from columns
df["text"] = (
    df["Skills"] + " " +
    df["Education"] + " " +
    df["Certifications"].fillna("") + " " +
    df["Experience (Years)"].astype(str)
)

# Features & labels
X = df["text"]
y = df["Job Role"]

# Vectorization
vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(X)

# Model
model = LogisticRegression(max_iter=1000)
model.fit(X_vec, y)

# Save
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("Model trained successfully!")
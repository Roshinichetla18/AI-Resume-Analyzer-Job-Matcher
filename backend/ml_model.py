import pickle

# Load trained model
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

def predict_role(text):
    vec = vectorizer.transform([text])
    role = model.predict(vec)[0]

    # Confidence score
    prob = model.predict_proba(vec).max()
    score = round(prob * 100)

    return role, score
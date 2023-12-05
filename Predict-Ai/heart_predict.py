import pandas as pd
from sklearn.ensemble import RandomForestClassifier


# Load the model
def load_model():

    heart_data = pd.read_csv('Heart_Disease_Prediction.csv')
    X = heart_data.drop('Heart Disease', axis=1)
    y = heart_data['Heart Disease']

    model = RandomForestClassifier(random_state=42)
    model.fit(X, y)

    return model


# Function to predict new patients
def predict_new_patients(model, new_patient_data):
    new_patient_df = pd.DataFrame([new_patient_data])
    probabilities = model.predict_proba(new_patient_df)[:, 1]
    percentage_prediction = f'{probabilities[0] * 100:.0f}' if probabilities[
        0].is_integer() else f'{probabilities[0] * 100:.2f}'
    return percentage_prediction

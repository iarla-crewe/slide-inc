from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

app = Flask(__name__)

# Load the model
def load_lung_cancer_model():
    lung_cancer_data = pd.read_csv('survey lung cancer.csv')
    lung_cancer_data.columns = lung_cancer_data.columns.str.strip()

    categorical_columns = ['GENDER']
    X = lung_cancer_data.drop('LUNG_CANCER', axis=1)
    y = lung_cancer_data['LUNG_CANCER']

    preprocessor = ColumnTransformer(
        transformers=[('cat', OneHotEncoder(), categorical_columns)],
        remainder='passthrough'
    )

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)
    X_train = preprocessor.fit_transform(X_train)

    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    return model, preprocessor


# Function to predict lung cancer probabilities for new patients
def predict_lung_cancer_model(model, preprocessor, new_patient_data):
    new_patient_df = pd.DataFrame([new_patient_data])
    new_patient_df = preprocessor.transform(new_patient_df)
    probabilities = model.predict_proba(new_patient_df)[:, 1]
    return probabilities[0]


def transform_lung_format(input_data):
    # Define a mapping for the transformation
    mapping = {
        "gender": "GENDER",
        "age": "AGE",
        "smoking": "SMOKING",
        "yellow_fingers": "YELLOW_FINGERS",
        "anxiety": "ANXIETY",
        "peer_pressure": "PEER_PRESSURE",
        "cronic_disease": "CHRONIC DISEASE",
        "fatigue": "FATIGUE",
        "allergy": "ALLERGY",
        "wheezing": "WHEEZING",
        "alcohol_consuming": "ALCOHOL CONSUMING",
        "coughing": "COUGHING",
        "shortness_of_breath": "SHORTNESS OF BREATH",
        "swallowing_difficulty": "SWALLOWING DIFFICULTY",
        "chest_pain": "CHEST PAIN"
    }

    # Create a new dictionary with transformed keys
    transformed_data = {mapping[key]: value for key, value in input_data.items()}

    return transformed_data
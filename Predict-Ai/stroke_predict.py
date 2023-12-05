import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from flask import Flask, request, jsonify

app = Flask(__name__)

def load_stroke_model():
    heart_data = pd.read_csv('healthcare-dataset-stroke-data.csv')

    heart_data = heart_data.dropna(subset=['bmi'])

    X = heart_data.drop('stroke', axis=1)
    y = heart_data['stroke']

    categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
    x_encoded = pd.get_dummies(X, columns=categorical_cols)

    model = RandomForestClassifier(random_state=42)
    model.fit(x_encoded, y)

    return model, x_encoded


def stroke_predict(model, x_encoded, new_patient_data):
    new_patient_df = pd.DataFrame([new_patient_data])

    categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
    new_patient_encoded = pd.get_dummies(new_patient_df, columns=categorical_cols)

    new_patient_encoded = new_patient_encoded.reindex(columns=x_encoded.columns, fill_value=0)

    probabilities = model.predict_proba(new_patient_encoded)[:, 1]
    percentage_prediction = f'{probabilities[0] * 100:.0f}' if probabilities[0].is_integer() else f'{probabilities[0] * 100:.2f}'
    return percentage_prediction



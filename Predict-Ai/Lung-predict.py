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
def predict_lung_cancer(model, preprocessor, new_patient_data):
    new_patient_df = pd.DataFrame([new_patient_data])
    new_patient_df = preprocessor.transform(new_patient_df)
    probabilities = model.predict_proba(new_patient_df)[:, 1]
    return probabilities[0]


# Load the lung cancer model during app initialization
lung_cancer_model, lung_cancer_preprocessor = load_lung_cancer_model()


# Define an endpoint to receive new patient data and make predictions
@app.route('/predictLung', methods=['POST'])
def predict_lung_cancer_endpoint():
    try:
        data = request.get_json()
        prediction = predict_lung_cancer(lung_cancer_model, lung_cancer_preprocessor, data)
        return jsonify({'prediction': f"{prediction * 100:.0f}%"})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)

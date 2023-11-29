from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)


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


# Load the model during app initialization
trained_model = load_model()


# Define an endpoint to receive new patient data and make predictions
@app.route('/predictHeart', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Assuming data is a dictionary containing new patient features
        prediction = predict_new_patients(trained_model, data)
        return jsonify({'prediction':  f'{prediction.rstrip("0").rstrip(".")}%'})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)

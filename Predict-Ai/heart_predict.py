import pandas as pd
from sklearn.ensemble import RandomForestClassifier


# Load the model
def load_model():
    # Load dataset
    heart_data = pd.read_csv('Heart_Disease_Prediction.csv')

    # Separate features into X and y
    X = heart_data.drop('Heart Disease', axis=1)
    y = heart_data['Heart Disease']

    # Create and train a model
    model = RandomForestClassifier(random_state=42)
    model.fit(X, y)

    # Create and train a Random Forest Classifier model
    model = RandomForestClassifier(random_state=42)
    model.fit(X, y)

    # Returns trained model
    return model


# Function to predict heart disease
def predict_heart_disease(model, new_patient_data):
    # Create a DataFrame for the new patient data
    new_patient_df = pd.DataFrame([new_patient_data])

    # Use the model to predict the probability of heart disease
    probabilities = model.predict_proba(new_patient_df)[:, 1]

    # Formatting
    percentage_prediction = f'{probabilities[0] * 100:.0f}' if probabilities[
        0].is_integer() else f'{probabilities[0] * 100:.2f}'

    # Return prediction
    return percentage_prediction

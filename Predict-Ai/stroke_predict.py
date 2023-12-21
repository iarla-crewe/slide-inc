import pandas as pd
from sklearn.ensemble import RandomForestClassifier


# Load the model
def load_stroke_model():
    # Load dataset
    heart_data = pd.read_csv('healthcare-dataset-stroke-data.csv')

    # Drop rows with missing values in the 'bmi' column
    heart_data = heart_data.dropna(subset=['bmi'])

    # Separate features into X and y
    X = heart_data.drop('stroke', axis=1)
    y = heart_data['stroke']

    # Encode categorical columns in the features
    categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
    x_encoded = pd.get_dummies(X, columns=categorical_cols)

    # Create and train a model
    model = RandomForestClassifier(random_state=42)
    model.fit(x_encoded, y)

    # Returns trained model and encoded feature
    return model, x_encoded

# Function to predict stroke
def stroke_predict(model, x_encoded, new_patient_data):
    # Create a DataFrame for the new patient data
    new_patient_df = pd.DataFrame([new_patient_data])

    # Encode categorical columns in the features
    categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
    new_patient_encoded = pd.get_dummies(new_patient_df, columns=categorical_cols)

    # Reindex columns to match the encoded feature set, filling missing values
    new_patient_encoded = new_patient_encoded.reindex(columns=x_encoded.columns, fill_value=0)

    # Use the model to predict the probability of stroke
    probabilities = model.predict_proba(new_patient_encoded)[:, 1]

    # Formatting
    percentage_prediction = f'{probabilities[0] * 100:.0f}' if probabilities[
        0].is_integer() else f'{probabilities[0] * 100:.2f}'

    # Return prediction
    return percentage_prediction

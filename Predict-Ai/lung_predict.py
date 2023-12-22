import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer


# Load the model
def load_lung_cancer_model():
    # Load dataset
    lung_cancer_data = pd.read_csv('survey lung cancer.csv')

    # Strip whitespaces from column names
    lung_cancer_data.columns = lung_cancer_data.columns.str.strip()

    # Define categorical columns and separate features into X and y
    categorical_columns = ['GENDER']
    X = lung_cancer_data.drop('LUNG_CANCER', axis=1)
    y = lung_cancer_data['LUNG_CANCER']

    # Set up a preprocessor to one-hot encode categorical columns
    preprocessor = ColumnTransformer(
        transformers=[('cat', OneHotEncoder(), categorical_columns)],
        remainder='passthrough'
    )

    # Create and train a model
    model = RandomForestClassifier(random_state=42)
    model.fit(X, y)

    # Returns trained model and preprocessor
    return model, preprocessor


# Function to predict lung cancer probabilities for new patients
def predict_lung_cancer(model, preprocessor, new_patient_data):
    # Create a DataFrame for the new patient data
    new_patient_df = pd.DataFrame([new_patient_data])

    # Transform categorical columns using the preprocessor
    new_patient_df = preprocessor.transform(new_patient_df)

    # Use the model to predict the probability of lung disease
    probabilities = model.predict_proba(new_patient_df)[:, 1]

    # Formatting
    percentage_prediction = f'{probabilities[0] * 100:.0f}' if probabilities[
        0].is_integer() else f'{probabilities[0] * 100:.2f}'

    # Return prediction
    return percentage_prediction

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
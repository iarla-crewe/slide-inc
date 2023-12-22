import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def transform_heart_format(input_data):
    # Define mappings for conversion
    sex_mapping = {'1': 1, '2': 2}
    chest_pain_mapping = {'0': 4, '1': 3, '2': 2, '3': 1}
    ekg_mapping = {'0': 1, '100': 1}  # Assuming '100' should map to 1, adjust as needed
    max_hr_mapping = {'50': 130}  # Assuming '50' should map to 130, adjust as needed
    thallium_mapping = {'0': 3}

    # Perform the conversion
    transformed_data = {
        "Age": int(input_data['Age']),
        "Sex": sex_mapping.get(input_data['Sex'], 1),
        "Chest pain type": chest_pain_mapping.get(str(input_data['Chest_pain_type']), 0),
        "BP": 100,  # You didn't provide a mapping for 'BP', using 100 as a placeholder
        "Cholesterol": 200,  # You didn't provide a mapping for 'Cholesterol', using 200 as a placeholder
        "FBS over 120": int(input_data['FBS_over_120']),
        "EKG results": ekg_mapping.get(str(input_data['EKG_results']), 0),
        "Max HR": max_hr_mapping.get(str(input_data['Max_HR']), 0),
        "Exercise angina": int(input_data['Exercise_angina']),
        "ST depression": float(input_data['ST_depression']),
        "Slope of ST": int(input_data['Slope_of_ST']),
        "Number of vessels fluro": int(input_data['Number_of_vessels_fluro']),
        "Thallium": thallium_mapping.get(str(input_data['Thallium']), 0)
    }

    return transformed_data

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

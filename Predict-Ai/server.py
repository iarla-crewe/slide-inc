from lung_predict import predict_lung_cancer_model, load_lung_cancer_model, transform_lung_format
from heart_predict import predict_heart_disease, load_model, transform_heart_format
from stroke_predict import stroke_predict, load_stroke_model

from flask import Flask, request, jsonify

# Initialize Flask application
app = Flask(__name__)


# Define an endpoint to receive new patient data and make predictions
@app.route('/predictLung', methods=['POST'])
def predict_lung_cancer():
    try:
        # Load the lung cancer prediction model and preprocessor
        lung_cancer_model, lung_cancer_preprocessor = load_lung_cancer_model()

        data = request.get_json()

        data = transform_lung_format(data)

        prediction = predict_lung_cancer_model(lung_cancer_model, lung_cancer_preprocessor, data)

        # Return the prediction as a JSON response
        return jsonify({'prediction': f"{prediction * 100:.0f}%"})
    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({'error': str(e)})


# Define an endpoint to receive new patient data and make predictions
@app.route('/predictHeart', methods=['POST'])
def predict_heart():
    try:
        # Load the heart disease prediction model
        trained_model = load_model()

        # Get the JSON data from the request
        data = request.get_json()

        data = transform_heart_format(data)

        # Assuming data is a dictionary containing new patient features
        prediction = predict_heart_disease(trained_model, data)
        return jsonify({'prediction':  f'{prediction.rstrip("0").rstrip(".")}%'})

    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({'error': str(e)})


# Define an endpoint to receive new patient data and make stroke predictions
@app.route('/predictStroke', methods=['POST'])
def predict_stroke():
    try:
        # Load the stroke prediction model and encoded feature set
        trained_model, x_encoded = load_stroke_model()

        # Get the JSON data from the request
        data = request.get_json()

        # Make stroke predictions using the loaded model and encoded feature set
        prediction = stroke_predict(trained_model, x_encoded, data)

        # Return the prediction as a JSON response
        return jsonify({'prediction': f'{prediction.rstrip("0").rstrip(".")}%'})
    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({'error': str(e)})


# Run the Flask application if the script is executed
if __name__ == '__main__':
    app.run(debug=True)

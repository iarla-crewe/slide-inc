from lung_predict import predict_lung_cancer, load_lung_cancer_model
from heart_predict import predict_new_patients, load_model

from flask import Flask, request, jsonify


app = Flask(__name__)

# Define an endpoint to receive new patient data and make predictions
@app.route('/predictLung', methods=['POST'])
def predict_lung_cancer_endpoint():
    try:
        lung_cancer_model, lung_cancer_preprocessor = load_lung_cancer_model()
        data = request.get_json()

        prediction = predict_lung_cancer(lung_cancer_model, lung_cancer_preprocessor, data)
        return jsonify({'prediction': f"{prediction * 100:.0f}%"})
    except Exception as e:
        return jsonify({'error': str(e)})



# Define an endpoint to receive new patient data and make predictions
@app.route('/predictHeart', methods=['POST'])
def predict():
    try:
        trained_model = load_model()

        data = request.get_json()
        # Assuming data is a dictionary containing new patient features
        prediction = predict_new_patients(trained_model, data)
        return jsonify({'prediction':  f'{prediction.rstrip("0").rstrip(".")}%'})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)

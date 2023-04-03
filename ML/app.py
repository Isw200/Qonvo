from flask import Flask, render_template, request, jsonify
from keras.models import load_model
from keras.preprocessing import image
import numpy as np

app = Flask(__name__)

# Load the Keras model
model = load_model('myModule.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST', "GET"])
def predict():
    # Get the uploaded image data from the request
    img_file = request.files['image']
    
    # Preprocess the image data
    img = image.load_img(img_file, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array /= 255.
    img_array = np.expand_dims(img_array, axis=0)
    
    # Use the model to make a prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    
    # Return the prediction as a JSON response
    return jsonify({'predicted_class': int(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)

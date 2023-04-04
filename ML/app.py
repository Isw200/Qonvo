from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

app = Flask(__name__)

# Load the pre-trained Keras model and class names
model = load_model("keras_model.h5", compile=False)
class_names = open("labels.txt", "r").readlines()

@app.route("/predict", methods=["GET", "POST"])
def predict():
    # Get the uploaded image file from the request
    file = request.files["image"]

    # Load the image file using PIL
    image = Image.open(file).convert("RGB")

    # Resize and normalize the image
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.LANCZOS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    # Make a prediction with the model
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = normalized_image_array
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    # Return the predicted class name and confidence score as a JSON response
    response = {
        "class_name": class_name[2:],
        "confidence_score": float(confidence_score)
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

from keras.models import load_model
import numpy as np
import flask
import io

app = flask.Flask(__name__)
model = None

def load_keras_model():
    global model
    model = load_model('ML/keras_model.h5')

def preprocess_image(image):
    image = image.convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image)
    image = image / 255.0
    image = image.reshape((1, 224, 224, 3))
    return image

@app.route("/predict", methods=["POST"])
def predict():
    data = {"success": False}
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))
            image = preprocess_image(image)
            preds = model.predict(image)
            label_names = [line.strip() for line in open('ML/labels.txt')]
            pred_labels = label_names[np.argmax(preds)]
            data["predictions"] = pred_labels
            data["success"] = True
    return flask.jsonify(data)

if __name__ == "__main__":
    print("Loading Keras model...")
    load_keras_model()
    app.run()

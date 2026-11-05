import tensorflow as tf
import numpy as np
import json
from PIL import Image


def predict_model(image_pth):
    model = tf.keras.models.load_model(
    "models/fruit_freshness_model.keras"
)

    with open("models/classes.json", "r") as file:
        class_names = json.load(file)

    image_path = image_pth 

    image = Image.open(image_path).convert("RGB")

    image = image.resize((224, 224))

    image_array = np.array(image)

    image_array = np.expand_dims(image_array, axis=0)

    predictions = model.predict(image_array)

    predicted_index = np.argmax(predictions[0])

    predicted_class = class_names[predicted_index]

    confidence = predictions[0][predicted_index] * 100

    condition, fruit = predicted_class.split("_", 1)

    print("--------------------------------")
    print("Fruit / Vegetable:", fruit)
    print("Condition:", condition)
    print("Class:", predicted_class)
    print("Confidence:", round(float(confidence), 2), "%")
    print("--------------------------------")

    return {
        "fruit":fruit,
        "condition":condition
    }


predict_model("dataset/test/bad/rotated_by_15_Screen Shot 2018-06-12 at 8.47.41 PM.png")
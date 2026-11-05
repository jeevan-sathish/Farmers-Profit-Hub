
import tensorflow as tf
import os
import json

from tensorflow.keras import layers, models

# -------------------------------
# CONFIGURATION
# -------------------------------

DATASET_PATH = "dataset/raw"
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15

os.makedirs("models", exist_ok=True)

# -------------------------------
# LOAD DATASET
# -------------------------------

train_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=42,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int"
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int"
)

class_names = train_ds.class_names

print("Classes:", class_names)
print("Number of classes:", len(class_names))

# -------------------------------
# SAVE CLASS NAMES
# -------------------------------

with open("models/classes.json", "w") as file:
    json.dump(class_names, file)

# -------------------------------
# OPTIMIZE DATA PIPELINE
# -------------------------------

AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)

# -------------------------------
# BUILD CNN MODEL
# -------------------------------

model = models.Sequential([

    layers.Input(shape=(224, 224, 3)),

    # Normalize pixels: 0-255 -> 0-1
    layers.Rescaling(1./255),

    layers.Conv2D(32, (3, 3), activation="relu"),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(64, (3, 3), activation="relu"),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(128, (3, 3), activation="relu"),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(256, (3, 3), activation="relu"),
    layers.MaxPooling2D((2, 2)),

    layers.GlobalAveragePooling2D(),

    layers.Dense(128, activation="relu"),
    layers.Dropout(0.3),

    layers.Dense(len(class_names), activation="softmax")
])

# -------------------------------
# COMPILE
# -------------------------------

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# -------------------------------
# TRAIN
# -------------------------------

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# -------------------------------
# SAVE MODEL
# -------------------------------

model.save("models/fruit_freshness_model.keras")

print("Model saved successfully!")


from fastapi import APIRouter, HTTPException, UploadFile, File
import predict as p
import tempfile
import os

router = APIRouter(prefix="/model", tags=["Model"])

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    temp_path = None

    try:
        suffix = os.path.splitext(file.filename or "")[1] or ".jpg"

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        result = p.predict_model(temp_path)

        return {
            "message": "Prediction successful",
            "result": result
        }

    except Exception as e:
        print("Prediction error:", repr(e))
        raise HTTPException(
            status_code=503,
            detail="Model failed to fetch prediction"
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import predict as p

router = APIRouter(prefix="/model", tags=["Model"])

class ImagePath(BaseModel):
    imagepath:str

@router.post("/predict")
def predict(path:ImagePath):
    try:
        result = p.predict_model(path.imagepath)
            

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail="Model failed to fetch prediction"
        )

    return {
        "message": "Welcome to model",
        "result": result
    }

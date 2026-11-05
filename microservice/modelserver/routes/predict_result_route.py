
from fastapi import APIRouter, HTTPException

import predict as p

router = APIRouter(prefix="/model", tags=["Model"])


@router.get("/predict")
def predict():
    try:
        result = p.predict_model(
            "dataset/test/good/rotated_by_15_Screen Shot 2018-06-12 at 9.38.10 PM.png"
        )

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail="Model failed to fetch prediction"
        )

    return {
        "message": "Welcome to model",
        "result": result
    }

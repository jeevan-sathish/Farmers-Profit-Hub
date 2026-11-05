from fastapi import FastAPI
from routes.predict_result_route import router as predict_model_route

app = FastAPI()

app.include_router(predict_model_route)

@app.get("/")
def demo():
    return {
        "message": "welcome"
    }
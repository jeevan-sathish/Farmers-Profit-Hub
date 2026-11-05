from fastapi import FastAPI
from routes.predict_result_route import router as predict_model_route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FarmersProfitHub Model Server")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://farmers-profit-hub.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_model_route)

@app.get("/")
def demo():
    return {
        "message": "welcome"
    }
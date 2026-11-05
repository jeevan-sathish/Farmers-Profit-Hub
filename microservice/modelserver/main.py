from fastapi import FastAPI
import predict as p

app =FastAPI()

@app.get('/')
def  demo():
    result =p.predict_model("dataset/test/good/rotated_by_15_Screen Shot 2018-06-12 at 9.38.10 PM.png")
    return {
        "message":"wellcome to model",
        "result":result
    }
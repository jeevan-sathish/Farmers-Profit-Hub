
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str

@app.post("/message")
def send_message(data: MessageRequest):
    return {
        "response": f"Backend received: {data.message}"
    }

class UserSignUP(BaseModel):
    name:str
    email:str
    password:str
    role:str

@app.post("/auth/signup")
def userSignup(data:UserSignUP):
    return {
        "id":1,
        "name":data.name,
        "email":data.email,
        "role":data.role,
        "fph_access_token":"accesstaokenxhgdddhddd",
        "fph_refresh_token":"refreshtokengggygygyughgygygvjhvhh"
        
    }

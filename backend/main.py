from routes.signin import SigninRouter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.UserModel import User
from database.db import Base, engine


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(SigninRouter, prefix="/auth")

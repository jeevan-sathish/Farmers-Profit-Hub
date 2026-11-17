from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.UserModel import User
from schemas.user_signin_scheme import UserSigninSchemaReq,UserSigninSchemaRes



SigninRouter = APIRouter()

@SigninRouter.post("/signin" ,response_model =UserSigninSchemaRes)
async def signin(data:UserSigninSchemaReq,db:Session =Depends(get_db)):
    existing_data = db.query(User).filter(User.email == data.email).first()
    if(existing_data):
        return {
            "message":"user found"
        }
    else:
        return{
            "message":"user not found",
            "status":404
        }
    
    
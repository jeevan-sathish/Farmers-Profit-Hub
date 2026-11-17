from pydantic import BaseModel

class UserSigninSchemaReq(BaseModel):
    email: str
    password: str

class UserSigninSchemaRes(BaseModel):
    message:str
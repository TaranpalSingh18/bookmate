from pydantic import BaseModel, EmailStr, Field

class UserSignup(BaseModel):
    name: str = Field(max_length=100)
    email: EmailStr
    password: str = Field(min_length=5)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


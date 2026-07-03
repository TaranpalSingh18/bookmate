from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from schema.user import UserLogin, UserSignup
from model.user import UserTable
from datetime import timedelta, timezone,datetime
import os
from uuid import uuid4
from fastapi.security import OAuth2PasswordRequestForm



auth = APIRouter(tags=["auth"], prefix="/auth")

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"



def create_access_token(data: dict, expires_delta: timedelta | None = None):
    token_data = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=1))
    token_data.update({"exp": expire})
    return jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)


@auth.post('/signup')
async def get_user(payload: UserSignup, db: Session = Depends(get_db)) -> dict:
    """ This is the signup route"""

    existing_user = db.query(UserTable).filter(UserTable.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = pwd_context.hash(payload.password)
    
    new_user = UserTable(
        id = str(uuid4()),
        email = payload.email,
        name = payload.name,
        password = hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"system_message": f"New User Created! email: {payload.email}", "user_id": new_user.id}
                                                                                

@auth.post('/login')
async def login_user(db: Session = Depends(get_db),  form_data: OAuth2PasswordRequestForm = Depends())->dict:
    """ This is the login route"""

    existing_user = db.query(UserTable).filter(UserTable.email == form_data.username).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found, Please signup")
    
    if not pwd_context.verify(form_data.password, existing_user.password):
        raise HTTPException(status_code = 400, detail="Invalid Credentials")
    
    access_token = create_access_token({"sub": existing_user.email})

    return {
        "system_mssg":"User Logined Succesfully",
        "access_token":access_token,
        "token_type":"bearer",
        "user_id": existing_user.id
    }

@auth.post('/logout')
async def user_logout(db: Session =  Depends(get_db)):
    """ This is the logout route"""
    return {"system_message":"Profile has been logged out. Please delete the access token from the client"}



    
    





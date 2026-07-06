from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from schema.user import UserLogin, UserSignup
import os
from datetime import datetime, timedelta
from uuid import uuid4
from fastapi.security import OAuth2PasswordRequestForm
from services.auth_service.auth import SignupService, LoginService


auth = APIRouter(tags=["auth"], prefix="/auth")

@auth.post('/signup')
async def signup(payload: UserSignup, db: Session = Depends(get_db)):
    return SignupService().create_new_user(
        payload=payload,
        db=db
    )

                                                                                

@auth.post('/login')
async def login_user(db: Session = Depends(get_db),  form_data: OAuth2PasswordRequestForm = Depends())->dict:
    return LoginService().login_user(
        form_data=form_data,
        db = db
    )



@auth.post('/logout')
async def user_logout():
    """ This is the logout route"""
    return {"system_message":"Profile has been logged out. Please delete the access token from the client"}



    
    





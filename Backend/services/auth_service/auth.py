from dotenv import load_dotenv
from datetime  import timedelta, datetime, timezone
import os
from jose import jwt
from uuid import uuid4
from ...schema.user  import UserSignup
from ...model.user import UserTable
from ...database import get_db
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

class AccessTokenService():
    load_dotenv()
    

    def __init__(self):
        self.algorithm = "HS256"
        self.secret_key = os.getenv("SECRET_KEY")

    def create_access_token(self, data: dict,  expires_delta: timedelta | None = None):
            token_data = data.copy()
            expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=1))
            token_data.update({"exp": expire})
            return jwt.encode(token_data, self.secret_key, algorithm=self.algorithm)
    


class SignupService():
     
    def __init__(self):
         pass
    
    def create_new_user(self, payload: UserSignup, db: Session) -> dict:
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


class LoginService(AccessTokenService):
     def __init__(self):
         super.__init__()
     
     def  login_user(self, db: Session ,form_data: OAuth2PasswordRequestForm)->dict:

        existing_user = db.query(UserTable).filter(UserTable.email == form_data.username).first()

        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found, Please signup")
        
        if not pwd_context.verify(form_data.password, existing_user.password):
            raise HTTPException(status_code = 400, detail="Invalid Credentials")
        
        access_token = self.create_access_token({"sub": existing_user.email})

        return {
            "system_mssg":"User Logined Succesfully",
            "access_token":access_token,
            "token_type":"bearer",
            "user_id": existing_user.id
        }

     
from fastapi import FastAPI
from database import Base, engine
from routes.auth.signup import auth
import os


app = FastAPI(debug=True)

if os.getenv("AUTO_CREATE_DB", "true").lower() in ("1", "true", "yes"):
    Base.metadata.create_all(bind=engine)

app.include_router(auth)


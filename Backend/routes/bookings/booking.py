from fastapi import APIRouter
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session



event = APIRouter(tags=['events'], prefix="/event")

@event.get('/')
async def get_event_details(db: Session = Depends(get_db)):
    

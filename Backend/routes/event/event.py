from fastapi import APIRouter, HTTPException
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from model.events import EventsTable
from schema.events import Events
from uuid import uuid4
from services.event_service.events import EventService


event = APIRouter(tags=['events'], prefix="/event")

@event.post('/create')
async def post_event_details(payload:Events, db: Session = Depends(get_db)):
    return EventService().create_events(payload = payload, db = db)


@event.get('/all')
async def get_all_events(db: Session = Depends(get_db)):
    """ The objective oof this route is get all the vevents that are listed"""
    return EventService().get_all_events(db = db)
    

@event.get('/{event_id}')
async def get_specific_event_detail(event_id: str, db: Session = Depends(get_db)):
    return EventService().get_events_by_id(event_id=event_id, db = db)

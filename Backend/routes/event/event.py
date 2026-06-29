from fastapi import APIRouter, HTTPException
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from model.events import EventsTable
from schema.events import Events
from uuid import uuid4


event = APIRouter(tags=['events'], prefix="/event")

@event.post('/create')
async def post_event_details(payload:Events, db: Session = Depends(get_db)):

    new_event = EventsTable(
        event_id = str(uuid4()),
        available_seats = payload.available_seats,
        event_name = payload.event_name,
        event_description = payload.event_description,
        event_date = payload.event_date,
        event_venue = payload.event_venue,
        total_seats = payload.total_seats
    )

    db.add(new_event)
    db.commit()

    db.refresh(new_event)

    return {"system_message":"New Event has been created", 
            "event_metadata": new_event}


@event.get('/all')
async def get_all_events(db: Session = Depends(get_db)):
    """ The objective oof this route is get all the vevents that are listed"""
    event_list = db.query(EventsTable).all()
    if event_list is None:
        raise HTTPException(detail="No event listed till now", status=404)
    
    return event_list

@event.get('/{event_id}')
async def get_specific_event_detail(event_id: str, db: Session = Depends(get_db)):

    existing_event = db.query(EventsTable).filter(EventsTable.event_id == event_id).first()

    if not existing_event:
        raise HTTPException(detail="This event does not exists", status_code = 404)
    
    return existing_event



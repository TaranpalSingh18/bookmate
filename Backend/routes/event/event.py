from fastapi import APIRouter
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from model.events import EventsTable
from schema.events import Events


event = APIRouter(tags=['events'], prefix="/event")

@event.post('/')
async def post_event_details(payload:Events, db: Session = Depends(get_db)):

    new_event = EventsTable(
        available_seats = payload.available_seats,
        event_name = payload.event_name,
        event_description = payload.event_description,
        event_date = payload.event_date,
        total_seats = payload.total_seats
    )

    db.add(new_event)
    db.commit()

    db.refresh(new_event)

    return {"system_message":"New Event has been created", 
            "event_metadata": new_event}



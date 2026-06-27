from fastapi import APIRouter, Depends, HTTPException
from schema.bookings import BookingRequest, BookingResponse
from model.booking import BookingsTable
from model.events import EventsTable
from model.user import UserTable
from database import get_db
from sqlalchemy.orm import Session
from uuid import uuid4

bookings = APIRouter(tags=['booking route'], prefix='/booking')


@bookings.post('/make', response_model=BookingResponse)
async def make_booking(payload: BookingRequest, db: Session = Depends(get_db)):
    existing_user = db.query(UserTable).filter(UserTable.id == payload.user_id).first()

    if not existing_user:
        raise HTTPException(detail="The user does not exists. Please create one", status_code=404)
    
    existing_event =  db.query(EventsTable).filter(EventsTable.event_id == payload.event_id).first()

    if not existing_event:
        raise HTTPException(detail="The Event does not exists", status_code=404)
    
    if existing_event.available_seats < payload.seats_required:
        raise ValueError("The seat requirement exceeds available seats. Please select less number of seats")
    
    booking = BookingsTable(
        booking_id = str(uuid4()),
        user_id = payload.user_id,
        event_id=payload.event_id,
        seats_required=payload.seats_required,
        confirm_booking=True
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking

    

    # booking_id = Column(String, primary_key=True, index=True)
    # user_id = Column(String, ForeignKey("users.id"), nullable=False)
    # event_id = Column(String, ForeignKey("events.event_id"), nullable=False)
    # seats_required = Column(Integer, nullable=False)
    # confirm_booking = Column(Boolean, default=False)



    






@bookings.get('/{user_id}/all')
async def get_user_bookings(user_id: str, db: Session = Depends(get_db)):

    existing_user = db.query(UserTable).filter(UserTable.id == user_id).first()

    if not existing_user:
        raise HTTPException(detail="The user does not exists. Please create one", status_code=404)
    
    bookings = db.query(BookingsTable).filter().all()

    if bookings is None:
        raise HTTPException(detail="No bookings till now")
    
    return bookings
    

    
    

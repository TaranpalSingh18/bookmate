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
    
    existing_event =  db.query(EventsTable).with_for_update().filter(EventsTable.event_id == payload.event_id).first()

    if not existing_event:
        raise HTTPException(detail="The Event does not exists", status_code=404)
    
    if existing_event.available_seats < payload.seats_required:
        raise HTTPException(
            status_code=400,
            detail="The seat requirement exceeds available seats. Please select less number of seats"
        )

    booking = BookingsTable(
        booking_id = str(uuid4()),
        user_id = payload.user_id,
        event_id=payload.event_id,
        seats_required=payload.seats_required,
        confirm_booking=True
    )

    db.add(booking)
    existing_event.available_seats -= payload.seats_required
    db.commit()
    db.refresh(booking)

    return booking


@bookings.delete('/{booking_id}')
async def cancel_booking(booking_id: str, db: Session = Depends(get_db)):
    existing_booking = db.query(BookingsTable).filter(BookingsTable.booking_id == booking_id).first()

    if not existing_booking:
        raise HTTPException(detail="Booking not found", status_code=404)

    if not existing_booking.confirm_booking:
        raise HTTPException(detail="This booking is already cancelled", status_code=400)

    existing_event = db.query(EventsTable).with_for_update().filter(EventsTable.event_id == existing_booking.event_id).first()
    if existing_event:
        existing_event.available_seats += existing_booking.seats_required

    existing_booking.confirm_booking = False
    db.commit()

    return {"system_message": "Booking cancelled successfully", "booking_id": booking_id}


@bookings.get('/{user_id}/all')
async def get_user_bookings(user_id: str, db: Session = Depends(get_db)):

    existing_user = db.query(UserTable).filter(UserTable.id == user_id).first()

    if not existing_user:
        raise HTTPException(detail="The user does not exists. Please create one", status_code=404)
    
    user_bookings = db.query(BookingsTable).filter(BookingsTable.user_id == user_id).all()

    return user_bookings
    



    
    

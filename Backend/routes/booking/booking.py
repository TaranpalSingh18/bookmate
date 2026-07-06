from fastapi import APIRouter, Depends, HTTPException
from schema.bookings import BookingRequest, BookingResponse
from model.booking import BookingsTable
from model.events import EventsTable
from model.user import UserTable
from database import get_db
from sqlalchemy.orm import Session
from uuid import uuid4
from services.booking_service.booking import BookingService

bookings = APIRouter(tags=['booking route'], prefix='/booking')


@bookings.post('/make', response_model=BookingResponse)
async def make_booking(payload: BookingRequest, db: Session = Depends(get_db)):
    return BookingService().create_bookings(
        payload=payload,
        db = db
    )


@bookings.delete('/{booking_id}')
async def cancel_booking(booking_id: str, db: Session = Depends(get_db)):
    return BookingService().delete_booking(
        booking_id=booking_id,
        db = db)




@bookings.get('/{user_id}/all')
async def get_user_bookings(user_id: str, db: Session = Depends(get_db)):
    return BookingService().get_user_bookings(
        user_id=user_id,
        db = db
    )
    



    
    

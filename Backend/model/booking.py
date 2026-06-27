from pydantic import BaseModel, Field

class Booking(BaseModel):
    user_id: str
    booking_id: str
    event_id: str
    seats_required: int
    confirm_booking: bool 
from pydantic import BaseModel, Field


class BookingRequest(BaseModel):
    user_id: str
    event_id: str
    seats_required: int = Field(gt=0)


class BookingResponse(BaseModel):
    booking_id: str
    user_id: str
    event_id: str
    seats_required: int
    confirm_booking: bool

    model_config = {
        "from_attributes": True
    }
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from database import Base

class BookingsTable(Base):
    __tablename__ = "bookings"

    booking_id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.user_id"), nullable=False)
    event_id = Column(String, ForeignKey("events.event_id"), nullable=False)
    seats_required = Column(Integer, nullable=False)
    confirm_booking = Column(Boolean, default=False)



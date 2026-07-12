from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, UniqueConstraint
from database import Base

class BookingsTable(Base):
    __tablename__ = "bookings"

    booking_id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    event_id = Column(String, ForeignKey("events.event_id"), nullable=False)
    confirm_booking = Column(Boolean, default=False)

class BookingSeatsTable(Base):
    """
    Stores individual seats tied to a booking so seats are auto-captured when selected.
    """
    __tablename__ = "booking_seats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    booking_id = Column(String, ForeignKey("bookings.booking_id", ondelete="CASCADE"), nullable=False, index=True)
    seat_id = Column(String, ForeignKey("seats.seat_id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("seat_id", name="uq_seat_single_booking"),  # prevent double-booking the same seat
    )``
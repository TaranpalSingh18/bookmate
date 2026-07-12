from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class SeatsTable(Base):
    __tablename__ = "seats"

    seat_id = Column(String, primary_key=True, index = True)
    event_id = Column(String, ForeignKey("events.event_id"), nullable=False)
    seat_number = Column(Integer, nullable=False)
    row_label = Column(String, nullable=True)
    seat_type = Column(String, nullable=True)  # e.g., regular/vip/accessible
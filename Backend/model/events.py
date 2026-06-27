from sqlalchemy import Column, String, Integer, DateTime
from uuid import uuid4
from database import Base

class EventsTable(Base):
    __tablename__ = "events"

    event_id = Column(String, primary_key=True, index = True, default=str(uuid4()))
    event_name = Column(String, index = True, nullable=False)
    event_description = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    event_venue = Column(String, nullable=False)
    total_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)


    


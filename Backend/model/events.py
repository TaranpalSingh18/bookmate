from sqlalchemy import Column, String, Integer, Date
from database import Base

class EventsTable(Base):
    __tablename__ = "events"

    event_id = Column(String, primary_key=True, index = True)
    event_name = Column(String, index = True, nullable=False)
    event_description = Column(String, nullable=False)
    event_date = Column(Date, nullable=False)
    total_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)


    


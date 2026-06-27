from pydantic import BaseModel, Field, model_validator
from datetime import datetime, timezone

class Events(BaseModel):
    event_name: str = Field(max_length=1000)
    event_description : str = Field(min_length=2, max_length=10000)
    event_date : datetime
    event_venue: str = Field(min_length=2, max_length=1000)
    total_seats: int = Field(gt=0)
    available_seats: int = Field(ge=0)

    @model_validator(mode="after")
    def validate_seats(self):
        if self.available_seats>self.total_seats:
            raise ValueError("Available seats cannot be greater than total seats of the venue")
        
        if self.event_date<datetime.now(timezone.utc):
            raise ValueError("Event Date should always be greater than the datetime now")
        

        return self
    
       

# Event Name
# Description
# Date & Time
# Venue
# Total Seats
# Available Seats


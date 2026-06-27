from sqlalchemy import Column, String, Integer, DateTime, JSON
from database import Base
from uuid import uuid4


class UserTable(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index = True, default=lambda: str(uuid4()))
    email = Column(String, unique=True, index = True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)




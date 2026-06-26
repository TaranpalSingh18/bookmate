from sqlalchemy import Column, String, Integer, DateTime, JSON
from database import Base


class UserTable(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index = True)
    email = Column(String, unique=True, index = True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)




import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

db_url = os.getenv("DB_URL")

# engine = create_engine(db_url) 
# connects python to postgres

engine = create_engine(
    db_url,
    pool_size=4,         # persistent connections --> i have chosen 4 because i have 2 cores in my cpu --> so 2*2 = 4 --> number of connections for best output/throughput
    max_overflow=30,      # extra connections during spikes
    pool_pre_ping=True,   # checks dead connections
    pool_recycle=3600     # recycle after 1 hour
)

# session_local = sessionmaker(bind = engine) ## creates one db session per query

session_local = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base() ## used to define ORM tables

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


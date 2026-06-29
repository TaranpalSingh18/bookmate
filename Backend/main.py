from fastapi import FastAPI
from database import Base, engine
from routes.auth.signup import auth
from routes.event.event import event
from routes.booking.booking import bookings
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials = True, ## browser credentials bhej sakta hai, jese jwt , cookies
    allow_methods=["*"], ## all methids allow krta hai , GET, POST, PUT, DELETE etc
    allow_headers=["*"] ## jese application header - bearer token bhejte hai, content type - application/json allow karta hai...
    #agar sirf "content_type" kardenge toh token browser block krdega --> auth nahi hoga allow agar browser se kroge toh...
    # agar postman ya koi curl command se kroge toh yeh block nahi hoga
)

app.add_middleware(GZipMiddleware,minimum_size=1000)
## response json ko compress krta hai


if os.getenv("AUTO_CREATE_DB", "true").lower() in ("1", "true", "yes"):
    Base.metadata.create_all(bind=engine)

app.include_router(auth)
app.include_router(event)
app.include_router(bookings)






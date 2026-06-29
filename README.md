## Bookmate – Event Ticket Booking Platform

Bookmate is a small full‑stack project for discovering events and booking tickets in a clean, modern UI.  
It’s built as a classic React + FastAPI stack: the **frontend** is a Vite + React app styled with Tailwind, and the **backend** is a FastAPI service with a PostgreSQL database and SQLAlchemy models.

The goal of the project is to give a realistic, end‑to‑end example of:
- A modern React SPA with routing, auth flows, and API calls
- A FastAPI backend with proper database models, schemas, and routing
- Simple but practical booking logic that feels like a real product

---

## Tech Stack

- **Frontend**
  - React (Vite)
  - React Router
  - Tailwind CSS
  - Axios

- **Backend**
  - FastAPI
  - SQLAlchemy ORM
  - Pydantic schemas
  - PostgreSQL


- **Auth & Security**
  - Argon2 / passlib for password hashing
  - `python-jose[cryptography]` for JWT handling
  - CORS via FastAPI middleware

- **Infra / Utilities**
  - `python-dotenv` for environment variables
  - `connection-pooling` for a bit of scaling
  - `uvicorn` as the ASGI server

---

## Project Structure (High Level)

```text
Backend/
  main.py               # FastAPI app entrypoint
  database.py           # DB engine, sessions, Base
  model/                # SQLAlchemy models (User, Event, Booking)
  schema/               # Pydantic schemas
  routes/
    auth/               # Signup / auth endpoints
    event/              # Event listing + details
    booking/            # Booking and cancellation

Frontend/
  src/
    main.jsx            # React entry
    App.jsx             # Routes wiring
    index.css           # Global styles + Tailwind
    api/                # Axios instances and API helpers
    components/         # Reusable UI (Navbar, cards, etc.)
    pages/              # Route‑level pages (Home, Login, Signup, Profile, Events, Booking)
```


---

## Core Features

- **Event discovery**
  - Hero landing page with a clean “Smart ticket booking” experience
  - Event listings with key details (name, venue, seats, pricing, etc.)

- **Authentication & Accounts**
  - User signup and login
  - Basic auth flow wired to the backend auth routes
  - User ID is stored client‑side so the app can fetch your bookings and protect profile routes

- **Ticket Booking**
  - Book seats for a given event from the frontend
  - Bookings are persisted in the database via FastAPI + SQLAlchemy

- **Profile & Bookings**
  - `Profile` page shows:
    - Your **confirmed** bookings
    - Your **cancelled** bookings
  - Cancel bookings with a confirmation modal – the UI updates without a full page reload

---

## Getting Started


### 1. Backend Setup

From the `Backend` directory:

```bash
pip install -r requirements.txt
```

Set your environment variables (at minimum `DB_URL`). A simple `.env` next to `database.py` might look like:

```env
DB_URL=postgresql+psycopg2://user:password@localhost:5432/linemate
AUTO_CREATE_DB=true
```

Then start the FastAPI server:

```bash
uvicorn main:app --reload
```

The app:
- Loads environment variables with `python-dotenv`
- Connects to PostgreSQL via `SQLAlchemy` (`database.py` configures the engine + session)
- Auto‑creates tables on startup when `AUTO_CREATE_DB` is enabled  
- Registers CORS to allow the Vite dev server (`http://localhost:5173`) to talk to the API

### 2. Frontend Setup

From the `Frontend` directory:

```bash
npm install
npm run dev
```

By default, Vite will serve the frontend on `http://localhost:5173`. The React app:
- Uses `react-router-dom` for client‑side routing
- Uses `axios` and helper functions under `src/api` to talk to the backend
- Uses Tailwind classes (via `index.css` and `tailwind.config.js`) for styling

Make sure the backend URL in your Axios setup matches where FastAPI is running.

---

## Key Frontend Screens

- **Home** (`Home.jsx`)
  - Marketing‑style hero section explaining the value prop (“Skip the chaos, book every ticket in seconds”)
  - CTAs to view events or sign up
  - A right‑hand “Ticket overview” card that mimics a real ticket dashboard

- **Events**
  - Fetches all events from the backend
  - Renders them using `EventCard` / `EventCardHero`‑style components

- **Signup / Login**
  - Forms that talk to the backend auth routes
  - On success, persist user details (e.g. user ID) so that profile and bookings work

- **Booking**
  - Page for selecting seats and confirming the booking for an event

- **Profile**
  - Loads current user bookings and events in parallel
  - Splits bookings into **Confirmed** and **Cancelled**
  - Provides an inline cancel button that opens a confirmation modal

---

## Backend Overview

- **`main.py`**
  - Creates the FastAPI app
  - Adds CORS and GZip middleware
  - Automatically creates database tables (when configured)
  - Includes routers for:
    - `auth` (signup / login)
    - `event` (CRUD / listing)
    - `booking` (create / cancel bookings)

- **`database.py`**
  - Builds a SQLAlchemy engine using `DB_URL`
  - Sets up a connection pool and `session_local`
  - Exposes `Base` for models and a `get_db` dependency for routes

- **Models & Schemas**
  - `model/*.py` – SQLAlchemy models for User, Event, Booking
  - `schema/*.py` – Pydantic models that define request/response contracts

---

## Running the App Locally

1. Start PostgreSQL locally and create a database (for example, `linemate`).
2. Configure `DB_URL` in your `.env` file in the `Backend` folder.
3. Install backend requirements and run `uvicorn main:app --reload`.
4. Install frontend dependencies and run `npm run dev` in `Frontend`.
5. Open the frontend URL in your browser and walk through:
   - Sign up as a new user
   - Log in
   - Browse events and book a ticket
   - Visit your Profile to confirm/cancel bookings

---



from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import sqlite3

app = FastAPI()
DB = "db.sqlite3"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    with sqlite3.connect(DB) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL,
                start_time TEXT NOT NULL,
                duration INTEGER NOT NULL,
                recurrence TEXT
            )
        ''')
        conn.commit()

class Event(BaseModel):
    name: str = Field(..., description="The name of the event")
    start_time: str = Field(..., description="The start time of the event")
    duration: int = Field(..., description="The duration of the event in minutes")
    recurrence: Optional[str] = Field(None, description="The recurrence of the event")

@app.get("/events", response_model=List[dict])
def get_events():
    with sqlite3.connect(DB) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events")
        events = cursor.fetchall()
        return [
            {
                "id": event[0],
                "name": event[1],
                "start_time": event[2],
                "duration": event[3],
                "recurrence": event[4]
            } for event in events
        ]
    
@app.post("/events", response_model=dict)
def add_event(event: Event):
    try:
        event_start_time = datetime.fromisoformat(event.start_time)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid start_time format.")

    with sqlite3.connect(DB) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events WHERE start_time = ?", (event.start_time,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Event already exists at this time")

        cursor.execute("INSERT INTO events (name, start_time, duration, recurrence) VALUES (?, ?, ?, ?)", (event.name, event.start_time, event.duration, event.recurrence))
        conn.commit()

    return {"message": "Event added successfully"}

@app.on_event("startup")
async def startup_event():
    init_db()

if __name__ == "__main__":
    init_db()
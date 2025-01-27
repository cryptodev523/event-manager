import { useEffect, useState } from "react";
import "./App.css";
import { AddEventForm } from "./components/AddEventForm";
import { EventList, Event } from "./components/EventList";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  const addEvent = (event: Event) => {
    fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => {
        if (res.status !== 400) {
          return res.json();
        }
        throw new Error("Failed to add event");
      })
      .then((data) => {
        console.log(data);
        setEvents([...events, event]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Event Scheduler</h1>
      <AddEventForm onAddEvent={addEvent} />
      <EventList events={events} />
    </div>
  );
}

export default App;

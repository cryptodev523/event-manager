import { useState } from "react";
import { Event } from "./EventList";

interface AddEventFormProps {
  onAddEvent: (event: Event) => void;
}

export const AddEventForm = ({ onAddEvent }: AddEventFormProps) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddEvent({
      name,
      start_time: startTime,
      duration,
      recurrence: selectedDays.join(","),
    });
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <div>
        <p>Recurrence</p>
        {weekDays.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
            />
            {day}
          </label>
        ))}
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export interface Event {
  id?: string;
  name: string;
  start_time: string;
  duration: string;
  recurrence: string;
}

interface EventListProps {
  events: Event[];
}

export const EventList = ({ events }: EventListProps) => {
  return (
    <div>
      <h2>Scheduled Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.start_time} ({event.duration} mins)
          </li>
        ))}
      </ul>
    </div>
  );
};

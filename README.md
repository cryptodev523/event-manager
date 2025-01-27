# Event Scheduler

A simple event scheduler that helps you manage and organize the events.

## Requirements

- Scheduled events must have a name and a specific start time and duration.
- Scheduled events may occur once, or may repeat weekly at the same time on one or more specific days of the week as specified by the user. (For example, a user may choose to schedule an event to occur at the same time every Monday and Wednesday.)
- No more than one event may be scheduled to occur at a given day and time.
- The UI must be compatible with current browser versions of at least Chrome and Firefox.
- The UI must allow the user to view the set of previously scheduled events and to add a new event.

## Technologies

- Frontend: React.js, Vite
- Backend: FastAPI, SQLite

## Installation

1. Clone the repository

```bash
git clone https://github.com/cryptodev523/event-manager.git

cd event-manager
```

2. Run the client

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

3. Run the development server

```bash
cd server

# Install FastAPI and Uvicorn
pip install fastapi uvicorn
# Run the server
uvicorn main:app --reload
```

The application will be available at `http://localhost:8000`.

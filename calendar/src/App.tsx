import { useEvents } from './hooks/useEvents';
import EventForm from './components/EventForm/EventForm';
import Calendar from './components/Calendar/Calendar';
import EventList from './components/EventList/EventList';
import './App.css';

function App() {
  const { events, addEvent, removeEvent } = useEvents();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Планировщик времени</h1>
      </header>
      
      <main className="app-main">
        <div className="app-sidebar">
          <EventForm onAddEvent={addEvent} />
          <EventList events={events} onRemoveEvent={removeEvent} />
        </div>
        
        <div className="app-calendar">
          <Calendar events={events} />
        </div>
      </main>
    </div>
  );
}

export default App;
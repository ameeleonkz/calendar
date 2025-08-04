import React from 'react';
import type { Event } from '../../types/event';
import './EventList.css';

interface EventListProps {
  events: Event[];
  onRemoveEvent: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onRemoveEvent }) => {
  if (events.length === 0) {
    return (
      <div className="event-list">
        <h3>Список событий</h3>
        <p className="no-events">Нет событий на сегодня</p>
      </div>
    );
  }

  return (
    <div className="event-list">
      <h3>Список событий ({events.length})</h3>
      
      <div className="events-scroll">
        {events.map(event => (
          <div 
            key={event.id} 
            className={`event-item ${event.hasConflict ? 'conflict' : ''}`}
          >
            <div className="event-info">
              <div 
                className="event-color-indicator"
                style={{ backgroundColor: event.color }}
              />
              
              <div className="event-details">
                <div className="event-item-title">{event.title}</div>
                <div className="event-item-time">
                  {event.startTime} - {event.endTime}
                </div>
                {event.hasConflict && (
                  <div className="conflict-warning">
                    ⚠️ Конфликт времени
                  </div>
                )}
              </div>
            </div>
            
            <button
              className="remove-button"
              onClick={() => onRemoveEvent(event.id)}
              title="Удалить событие"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
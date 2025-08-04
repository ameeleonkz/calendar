import React from 'react';
import type { Event } from '../../types/event';
import { getEventPosition } from '../../utils/timeUtils';
import './EventBlock.css';

interface EventBlockProps {
  event: Event;
}

const EventBlock: React.FC<EventBlockProps> = ({ event }) => {
  const { top, height } = getEventPosition(event.startTime, event.endTime);

  return (
    <div
      className={`event-block ${event.hasConflict ? 'conflict' : ''}`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: event.color,
        borderColor: event.hasConflict ? '#dc3545' : event.color,
      }}
    >
      <div className="event-content">
        <div className="event-title">{event.title}</div>
        <div className="event-time">
          {event.startTime} - {event.endTime}
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
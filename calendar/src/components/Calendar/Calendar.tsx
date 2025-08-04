import React from 'react';
import type { Event } from '../../types/event';
import TimeScale from '../TimeScale/TimeScale';
import EventBlock from '../EventBlock/EventBlock';
import { START_HOUR, END_HOUR } from '../../constants/timeConstants';
import './Calendar.css';

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Расписание дня</h3>
      </div>
      
      <div className="calendar-body">
        <TimeScale hours={hours} />
        
        <div className="events-container">
          {events.map(event => (
            <EventBlock key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
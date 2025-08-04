import React from 'react';
import { HOUR_HEIGHT } from '../../constants/timeConstants';
import './TimeScale.css';

interface TimeScaleProps {
  hours: number[];
}

const TimeScale: React.FC<TimeScaleProps> = ({ hours }) => {
  return (
    <div className="time-scale">
      {hours.map(hour => (
        <div 
          key={hour} 
          className="time-slot"
          style={{ height: HOUR_HEIGHT }}
        >
          <span className="time-label">
            {hour.toString().padStart(2, '0')}:00
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeScale;
import React, { useState } from 'react';
import type { Event } from '../../types/event';
import { isValidTimeRange } from '../../utils/timeUtils';
import './EventForm.css';

interface EventFormProps {
  onAddEvent: (event: Omit<Event, 'id' | 'hasConflict' | 'color'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Название события обязательно');
      return;
    }

    if (!isValidTimeRange(startTime, endTime)) {
      setError('Неверный временной интервал. Время должно быть между 9:00 и 21:00');
      return;
    }

    onAddEvent({
      title: title.trim(),
      startTime,
      endTime
    });

    // Reset form
    setTitle('');
    setStartTime('09:00');
    setEndTime('10:00');
    setError('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>Добавить событие</h3>
      
      <div className="form-group">
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название события"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startTime">Время начала:</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          min="09:00"
          max="21:00"
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endTime">Время окончания:</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          min="09:00"
          max="21:00"
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button">
        Добавить событие
      </button>
    </form>
  );
};

export default EventForm;
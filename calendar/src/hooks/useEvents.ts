import { useState, useCallback } from 'react';
import type { Event } from '../types/event';
import { detectConflicts } from '../utils/conflictUtils';
import { COLORS } from '../constants/timeConstants';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = useCallback((eventData: Omit<Event, 'id' | 'hasConflict' | 'color'>) => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      color: COLORS[events.length % COLORS.length],
      hasConflict: false
    };

    setEvents(prevEvents => {
      const updatedEvents = [...prevEvents, newEvent];
      return detectConflicts(updatedEvents);
    });
  }, [events.length]);

  const removeEvent = useCallback((id: string) => {
    setEvents(prevEvents => {
      const filteredEvents = prevEvents.filter(event => event.id !== id);
      return detectConflicts(filteredEvents);
    });
  }, []);

  return { events, addEvent, removeEvent };
};
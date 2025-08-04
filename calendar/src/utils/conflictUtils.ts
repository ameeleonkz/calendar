import type { Event } from '../types/event';
import { timeToMinutes } from './timeUtils';

export const hasTimeOverlap = (event1: Event, event2: Event): boolean => {
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);
  
  return start1 < end2 && start2 < end1;
};

export const detectConflicts = (events: Event[]): Event[] => {
  return events.map(event => {
    const hasConflict = events.some(otherEvent => 
      otherEvent.id !== event.id && hasTimeOverlap(event, otherEvent)
    );
    
    return { ...event, hasConflict };
  });
};
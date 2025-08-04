export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  export const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  export const isValidTimeRange = (start: string, end: string): boolean => {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const dayStart = 9 * 60; // 9:00
    const dayEnd = 21 * 60;  // 21:00
    
    return startMinutes >= dayStart && 
           endMinutes <= dayEnd && 
           startMinutes < endMinutes;
  };
  
  export const getEventPosition = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const dayStartMinutes = 9 * 60;
    
    const top = ((startMinutes - dayStartMinutes) / 60) * 60; // 60px per hour
    const height = ((endMinutes - startMinutes) / 60) * 60;
    
    return { top, height };
  };
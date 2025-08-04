import { describe, it, expect } from 'vitest'
import { hasTimeOverlap, detectConflicts } from '../../utils/conflictUtils'
import type { Event } from '../../types/event'

const createEvent = (id: string, startTime: string, endTime: string): Event => ({
  id,
  title: `Event ${id}`,
  startTime,
  endTime,
  color: '#FF6B6B',
  hasConflict: false
})

describe('conflictUtils', () => {
  describe('hasTimeOverlap', () => {
    it('detects overlapping events', () => {
      const event1 = createEvent('1', '09:00', '10:00')
      const event2 = createEvent('2', '09:30', '10:30')
      
      expect(hasTimeOverlap(event1, event2)).toBe(true)
    })

    it('detects non-overlapping events', () => {
      const event1 = createEvent('1', '09:00', '10:00')
      const event2 = createEvent('2', '10:00', '11:00')
      
      expect(hasTimeOverlap(event1, event2)).toBe(false)
    })

    it('detects adjacent events as non-overlapping', () => {
      const event1 = createEvent('1', '09:00', '10:00')
      const event2 = createEvent('2', '10:00', '11:00')
      
      expect(hasTimeOverlap(event1, event2)).toBe(false)
    })
  })

  describe('detectConflicts', () => {
    it('marks conflicting events', () => {
      const events = [
        createEvent('1', '09:00', '10:00'),
        createEvent('2', '09:30', '10:30'),
        createEvent('3', '11:00', '12:00')
      ]

      const result = detectConflicts(events)
      
      expect(result[0].hasConflict).toBe(true)
      expect(result[1].hasConflict).toBe(true)
      expect(result[2].hasConflict).toBe(false)
    })

    it('handles no conflicts', () => {
      const events = [
        createEvent('1', '09:00', '10:00'),
        createEvent('2', '10:00', '11:00'),
        createEvent('3', '11:00', '12:00')
      ]

      const result = detectConflicts(events)
      
      expect(result.every(event => !event.hasConflict)).toBe(true)
    })
  })
})
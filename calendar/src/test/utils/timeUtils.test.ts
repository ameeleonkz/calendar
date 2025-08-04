import { describe, it, expect } from 'vitest'
import { 
  timeToMinutes, 
  minutesToTime, 
  isValidTimeRange, 
  getEventPosition 
} from '../../utils/timeUtils'

describe('timeUtils', () => {
  describe('timeToMinutes', () => {
    it('converts time string to minutes', () => {
      expect(timeToMinutes('09:00')).toBe(540)
      expect(timeToMinutes('12:30')).toBe(750)
      expect(timeToMinutes('21:00')).toBe(1260)
    })
  })

  describe('minutesToTime', () => {
    it('converts minutes to time string', () => {
      expect(minutesToTime(540)).toBe('09:00')
      expect(minutesToTime(750)).toBe('12:30')
      expect(minutesToTime(1260)).toBe('21:00')
    })
  })

  describe('isValidTimeRange', () => {
    it('validates correct time ranges', () => {
      expect(isValidTimeRange('09:00', '10:00')).toBe(true)
      expect(isValidTimeRange('12:00', '13:30')).toBe(true)
      expect(isValidTimeRange('20:00', '21:00')).toBe(true)
    })

    it('rejects invalid time ranges', () => {
      expect(isValidTimeRange('10:00', '09:00')).toBe(false) // end before start
      expect(isValidTimeRange('08:00', '10:00')).toBe(false) // start too early
      expect(isValidTimeRange('20:00', '22:00')).toBe(false) // end too late
      expect(isValidTimeRange('10:00', '10:00')).toBe(false) // same time
    })
  })

  describe('getEventPosition', () => {
    it('calculates correct position and height', () => {
      const { top, height } = getEventPosition('10:00', '11:00')
      expect(top).toBe(60) // 1 hour from 9:00 start
      expect(height).toBe(60) // 1 hour duration
    })

    it('calculates position for longer events', () => {
      const { top, height } = getEventPosition('09:30', '12:00')
      expect(top).toBe(30) // 30 minutes from 9:00 start
      expect(height).toBe(150) // 2.5 hours duration
    })
  })
})
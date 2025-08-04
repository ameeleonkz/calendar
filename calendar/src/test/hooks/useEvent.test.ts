import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEvents } from '../../hooks/useEvents'

describe('useEvents', () => {
  it('initializes with empty events', () => {
    const { result } = renderHook(() => useEvents())
    
    expect(result.current.events).toEqual([])
  })

  it('adds event correctly', () => {
    const { result } = renderHook(() => useEvents())
    
    act(() => {
      result.current.addEvent({
        title: 'Test Event',
        startTime: '09:00',
        endTime: '10:00'
      })
    })

    expect(result.current.events).toHaveLength(1)
    expect(result.current.events[0].title).toBe('Test Event')
    expect(result.current.events[0].id).toBeDefined()
    expect(result.current.events[0].color).toBeDefined()
  })

  it('removes event correctly', () => {
    const { result } = renderHook(() => useEvents())
    
    act(() => {
      result.current.addEvent({
        title: 'Test Event',
        startTime: '09:00',
        endTime: '10:00'
      })
    })

    const eventId = result.current.events[0].id

    act(() => {
      result.current.removeEvent(eventId)
    })

    expect(result.current.events).toHaveLength(0)
  })

  it('detects conflicts when adding overlapping events', () => {
    const { result } = renderHook(() => useEvents())
    
    act(() => {
      result.current.addEvent({
        title: 'Event 1',
        startTime: '09:00',
        endTime: '10:00'
      })
    })

    act(() => {
      result.current.addEvent({
        title: 'Event 2',
        startTime: '09:30',
        endTime: '10:30'
      })
    })

    expect(result.current.events[0].hasConflict).toBe(true)
    expect(result.current.events[1].hasConflict).toBe(true)
  })
})
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventForm from '../../components/EventForm/EventForm'

describe('EventForm', () => {
  it('renders form fields', () => {
    const mockOnAddEvent = vi.fn()
    render(<EventForm onAddEvent={mockOnAddEvent} />)

    expect(screen.getByRole('textbox', { name: /название/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('09:00')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /добавить событие/i })).toBeInTheDocument()
  })

  it('validates required title', async () => {
    const mockOnAddEvent = vi.fn()
    const user = userEvent.setup()
    
    render(<EventForm onAddEvent={mockOnAddEvent} />)

    const submitButton = screen.getByRole('button', { name: /добавить событие/i })
    await user.click(submitButton)

    expect(screen.getByText(/название события обязательно/i)).toBeInTheDocument()
    expect(mockOnAddEvent).not.toHaveBeenCalled()
  })
})
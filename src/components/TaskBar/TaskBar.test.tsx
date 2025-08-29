import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TaskBar from './TaskBar'
import todoSlice from '../../store/todoSlice'

describe('TaskBar Component', () => {
    const mockSetIsFolded = vi.fn()
    const mockStore = configureStore({
        reducer: {
            todos: todoSlice
        }
  })

    test('renders input and icons', () => {
        render(
        <Provider store={mockStore}>
            <TaskBar isFolded={false} setIsFolded={mockSetIsFolded} />
        </Provider>
        )
        
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
        expect(screen.getByTestId('arrow-up')).toBeInTheDocument()
    })

    test('shows add icon when text is entered', async () => {
        const user = userEvent.setup()
        
        render(
        <Provider store={mockStore}>
            <TaskBar isFolded={false} setIsFolded={mockSetIsFolded} />
        </Provider>
        )
        
        const input = screen.getByPlaceholderText('What needs to be done?')
        await user.type(input, 'New task')
        
        expect(screen.getByTestId('add-icon')).toBeInTheDocument()
    })

    test('calls setIsFolded when arrow is clicked', async () => {
        const user = userEvent.setup()
        
        render(
        <Provider store={mockStore}>
            <TaskBar isFolded={false} setIsFolded={mockSetIsFolded} />
        </Provider>
        )
        
        const arrowIcon = screen.getByTestId('arrow-up')
        await user.click(arrowIcon)
        
        expect(mockSetIsFolded).toHaveBeenCalled()
    })
})
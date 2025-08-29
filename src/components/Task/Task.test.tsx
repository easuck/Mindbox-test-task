import { render, screen } from '@testing-library/react'
import { test, expect, describe } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Task from './Task'
import todoSlice from '../../store/todoSlice'
import { ITodo } from '../../models/ITodo'
import { ChipType } from '../Chip/Chip'


describe('Task Component', () => {
    const mockStore = configureStore({
        reducer: {
            todos: todoSlice
        }
    })

    const mockTodo: ITodo = {
    id: '1',
    text: 'Test task',
    status: ChipType.ACTIVE
    }

    test('renders task text', () => {
        render(
        <Provider store={mockStore}>
            <Task todo={mockTodo} />
        </Provider>
        )
        
        expect(screen.getByText('Test task')).toBeInTheDocument()
    })

    test('applies completed class for completed task', () => {
        const completedTodo = { ...mockTodo, status: ChipType.COMPLETED }
        
        render(
        <Provider store={mockStore}>
            <Task todo={completedTodo} />
        </Provider>
        )
        
        const taskText = screen.getByText('Test task')
        expect(taskText).toHaveClass('completed')
    })
})

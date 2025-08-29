import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TaskList from './TaskList'
import { ChipType } from '../Chip/Chip'

describe('TaskList Component', () => {
    const mockSetSelectedChip = vi.fn()
    const mockStore = configureStore({
        reducer: {
        todos: () => ({ 
            todos: [
            { id: '1', text: 'Task 1', status: ChipType.ACTIVE },
            { id: '2', text: 'Task 2', status: ChipType.COMPLETED }
            ] 
        })
        }
    })

    test('renders items left count', () => {
        render(
        <Provider store={mockStore}>
            <TaskList 
            isFolded={false} 
            selectedChip={ChipType.ALL} 
            setSelectedChip={mockSetSelectedChip}
            >
            <div>Test children</div>
            </TaskList>
        </Provider>
        )
        
        expect(screen.getByText('2 items left')).toBeInTheDocument()
    })

    test('renders all chips', () => {
        render(
        <Provider store={mockStore}>
            <TaskList 
            isFolded={false} 
            selectedChip={ChipType.ALL} 
            setSelectedChip={mockSetSelectedChip}
            >
            <div>Test children</div>
            </TaskList>
        </Provider>
        )
        
        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Active')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })
})
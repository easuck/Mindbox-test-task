import { describe, test, expect, vi, beforeEach } from 'vitest'
import todoSlice, { addTodo, changeTodoStatus, clearCompleted } from './todoSlice'
import { ITodo } from '../models/ITodo'
import { ChipType } from '../components/Chip/Chip'

describe('todoSlice', () => {
    const mockTodo: ITodo = {
        id: '1',
        text: 'Test todo',
        status: ChipType.ACTIVE
    }

    beforeEach(() => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('[]')
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {})
    })

    test('should handle initial state', () => {
        const state = todoSlice(undefined, { type: 'unknown' })
        expect(state.todos).toEqual([])
    })

    test('should handle addTodo', () => {
        const state = todoSlice(undefined, addTodo(mockTodo))
        expect(state.todos).toHaveLength(1)
        expect(state.todos[0]).toEqual(mockTodo)
    })

    test('should handle changeTodoStatus to COMPLETED', () => {
        const stateWithTodo = { todos: [mockTodo] }
        const state = todoSlice(stateWithTodo, changeTodoStatus(mockTodo))
        expect(state.todos[0].status).toBe(ChipType.COMPLETED)
    })

    test('should handle changeTodoStatus to ACTIVE', () => {
        const completedTodo = { ...mockTodo, status: ChipType.COMPLETED }
        const stateWithTodo = { todos: [completedTodo] }
        const state = todoSlice(stateWithTodo, changeTodoStatus(completedTodo))
        expect(state.todos[0].status).toBe(ChipType.ACTIVE)
    })

    test('should handle clearCompleted', () => {
        const todos = [
        mockTodo,
        { ...mockTodo, id: '2', status: ChipType.COMPLETED },
        { ...mockTodo, id: '3', status: ChipType.COMPLETED }
        ]
        const stateWithTodos = { todos }
        const state = todoSlice(stateWithTodos, clearCompleted())
        expect(state.todos).toHaveLength(1)
        expect(state.todos[0].status).toBe(ChipType.ACTIVE)
    })
})
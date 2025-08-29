import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITodo } from "../models/ITodo";
import { ChipType } from "../components/Chip/Chip";

type initialStateProps = {
    todos: ITodo[];
}

const initialState: initialStateProps = {
    todos: JSON.parse(localStorage.getItem('todos')) || []
}

const saveTodos = (todos: ITodo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload);
            saveTodos(state.todos);
        },
        changeTodoStatus: (state, action: PayloadAction<ITodo>) => {
            const todo = state.todos.find(todo => todo.id == action.payload.id);
            if (todo) {
                todo.status = todo.status == ChipType.ACTIVE ? ChipType.COMPLETED : ChipType.ACTIVE
                saveTodos(state.todos);
            }
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((todo) => todo.status != ChipType.COMPLETED);
            saveTodos(state.todos);
        }
    }
});

export const {addTodo, changeTodoStatus, clearCompleted} = todoSlice.actions;
export default todoSlice.reducer;
import { createSlice, nanoid } from '@reduxjs/toolkit'

const items= localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : []


const initialState = {
    todos: items
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                toggle: false
            }
            state.todos.push(todo)
            localStorage.setItem('todos',JSON.stringify(state.todos.map(todo=>todo)))
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)

        },

        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
        },

        toggleTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload ? { ...todo, toggle: !todo.toggle } : todo)
        }
    }
})

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer
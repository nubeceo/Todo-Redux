import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, toggleTodo, updateTodo } from '../features/todo/TodoSlice'




function TodoItems({ todo }) {

    const [editedMsg, seteditedMsg] = useState(todo.text);
    const [isTodoEditable, setisTodoEditable] = useState(false)


    const dispatch = useDispatch()

    const editTodo = () => {
        dispatch(updateTodo(todo.id, editedMsg))
        setisTodoEditable(false)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.toggle ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.toggle}
                onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.toggle ? "line-through" : ""}`}
                value={editedMsg}
                onChange={(e) => seteditedMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.toggle) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setisTodoEditable((prev) => !prev);
                }}
                disabled={todo.toggle}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>

            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => dispatch(removeTodo(todo.id))}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItems;

import React from 'react'

import { TbTrashXFilled, TbEdit, TbCancel } from "react-icons/tb";
import { MdDone } from "react-icons/md";

interface Todo {
    _id?: string;
    title?: string;
    completed?: boolean;
    userId?: string;
}

interface TodoProps {
    todos: Todo;
    completeTodoHandler: (id: string) => void;
    updateTodoHandler: (id: string, title: string) => void;
    deleteTodoHandler: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, completeTodoHandler, deleteTodoHandler, updateTodoHandler }) => {
    const { _id, title, completed, userId } = todos;
    const [ isCompleted, setIsCompleted ] = React.useState(completed);
    const [ isEditing, setIsEditing ] = React.useState(false);
    const [ _title, setTitle ] = React.useState(title);

    return isEditing ? (
        <li className='flex flex-row items-center justify-center' >
            <input
                type="text"
                name=""
                id=""
                className='flex-1'
                value={_title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <button
                onClick={() => setIsEditing(!isEditing)}
                className='
                    hover:bg-red-500
                    hover:text-red-50
                    cursor-pointer
                    rounded-md
                    text-red-500
                    border-2
                    border-red-500
                    ml-2
                    w-10
                    h-10
                    flex
                    justify-center
                    items-center
                '
            >
                <TbCancel />
            </button>
            <button
                onClick={ () => {
                    updateTodoHandler(_id!, _title!)
                    setIsEditing(!isEditing)
                } }
                className='
                    hover:bg-green-500
                    hover:text-green-50
                    cursor-pointer
                    rounded-md
                    text-green-500
                    border-2
                    border-green-500
                    ml-2
                    w-10
                    h-10
                    flex
                    justify-center
                    items-center
                '
            >
                <MdDone />
            </button>
        </li>
    ) : (
        <li className='flex flex-row items-center pb-2 justify-center' >
            <input
                type="checkbox"
                name=""
                id={`check-${_id}`}
                checked={completed}
                onChange={ () => {
                    completeTodoHandler(_id!)
                    setIsCompleted(!isCompleted);
                }}
                className='mr-2'
            />
            <label htmlFor={`check-${_id}`} className={`${isCompleted ? 'line-through' : ''} whitespace-normal break-words flex-1 w-40`}>{title}</label>
            <button
                onClick={() => setIsEditing(!isEditing)}
                className='
                    hover:bg-amber-500
                    hover:text-amber-50
                    cursor-pointer
                    rounded-md
                    text-amber-500
                    border-2
                    border-amber-500
                    ml-2
                    w-10
                    h-10
                    flex
                    justify-center
                    items-center
                '
            >
                <TbEdit />
            </button>
            <button
                onClick={ () => deleteTodoHandler(_id!) }
                className='
                    hover:bg-red-500
                    hover:text-red-50
                    cursor-pointer
                    rounded-md
                    text-red-500
                    border-2
                    border-red-500
                    ml-2
                    w-10
                    h-10
                    flex
                    justify-center
                    items-center
                '
            >
                <TbTrashXFilled />
            </button>
        </li>
    )
}

export default Todo
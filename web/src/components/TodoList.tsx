import React from 'react'
import Todo from './Todo';

interface TodoItem {
    _id?: string;
    title?: string;
    completed?: boolean;
    userId?: string;
}

interface TodoProps {
    todos: TodoItem[];
    completeTodoHandler: (id: string) => void;
    updateTodoHandler: (id: string, title: string) => void;
    deleteTodoHandler: (id: string) => void;
}

const TodoList: React.FC<TodoProps> = ({ todos, completeTodoHandler, deleteTodoHandler, updateTodoHandler }) => {
    return (
        <ul className='max-w-3/6 mx-auto px-10 py-15 rounded-2xl border-2 border-cyan-950 bg-cyan-50 gap-20 h-96' >
            {
                todos.map( todo => {
                    return (
                        <Todo 
                            key={todo._id}
                            todos={todo}
                            completeTodoHandler={completeTodoHandler}
                            updateTodoHandler={ updateTodoHandler }
                            deleteTodoHandler={ deleteTodoHandler }
                        />
                    )
                })
            }
        </ul>
    )
}

export default TodoList
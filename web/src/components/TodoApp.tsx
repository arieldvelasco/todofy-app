import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";

const userId = '3cf4741f-127a-42d7-9049-080a53b4f98b'; // Example userId, replace with actual userId if needed

interface Todo {
    title?: string;
    userId?: string;
    completed: boolean;
}

const TodoApp = () => {

    const [ todos, setTodos ] = useState<Todo[]>([]);

    const getTodos = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/todos/get/${userId}`)
            const todoList = await res.json()
            setTodos(todoList)
            console.log('getTodos: ', todoList)
        } catch (error) {
            setTodos([])
            console.error("Error fetching todos:", error);
        }
    }

    const addTodoHandler = async (title: String, userId: String) => {
        try {
            const res = await fetch('http://localhost:3001/api/todos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    userId,
                    completed: false
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to add todo');
            }
            getTodos()
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const completeTodoHandler = async (id: string) => {
        try {
            const res = await fetch('http://localhost:3001/api/todos/complete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) {
                throw new Error('Failed to complete todo');
            }
            getTodos()
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    }

    const updateTodoHandler = async (id: string, title: string) => {
        try {
            const res = await fetch('http://localhost:3001/api/todos/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, title }),
            });
            if (!res.ok) {
                throw new Error('Failed to update todo');
            }
            getTodos()
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    const deleteTodoHandler = async (id: string) => {
        try {
            const res = await fetch('http://localhost:3001/api/todos/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) {
                throw new Error('Failed to delete todo');
            }
            getTodos()
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    useEffect(() => {
        getTodos()
    }, []);

    return (
        <main>
            <TodoAdd userId={userId} addTodoHandler={addTodoHandler} />
            <TodoList
                todos={todos}
                completeTodoHandler={ completeTodoHandler }
                updateTodoHandler={ updateTodoHandler }
                deleteTodoHandler={ deleteTodoHandler }
            />
        </main>
    )
}

export default TodoApp
import React, { useEffect, useState } from 'react'

interface TodoAddProps {
    userId?: string;
    addTodoHandler: (title: String, userId: String) => void;
}

const placeholderTodos = [
    "Buy groceries",
    "Walk the dog",
    "Read a book",
    "Finish homework",
    "Call mom",
    "Clean the kitchen",
    "Pay bills",
    "Exercise for 30 minutes",
    "Reply to emails",
    "Plan weekend trip"
];

const TodoAdd: React.FC<TodoAddProps> = ({ userId, addTodoHandler }) => {

    const [ todo, setTodo ] = useState<string>("");

    const [ placeholder, setPlaceholder ] = React.useState<string>("New Todo...");

    const randomizePlaceholder = () => {
        const randomIndex = Math.floor(Math.random() * placeholderTodos.length);
        setPlaceholder(placeholderTodos[randomIndex]);
    }

    const handleAddTodo = () => {
        if (todo != "" && userId) {
            addTodoHandler(todo, userId);
        }
        randomizePlaceholder();
        setTodo("");
        document.getElementById("newTodo")?.focus();
    }

    useEffect(() => {
        randomizePlaceholder();
    }, []);

    return (
        <header className='bg-cyan-50 text-blue-50 px-4 py-6 flex flex-row justify-center align-middle rounded-3xl max-w-3/6 mx-auto mb-10 mt-10' >
            <label htmlFor="newTodo" className='bg-cyan-700 px-3 py-2 rounded-l-lg w-32 flex align-middle justify-center font-bold' >New Todo</label>
            <input
                className='bg-white text-black flex-1 pl-2 border-2 border-cyan-950 focus:outline-none focus:border-cyan-700'
                type="text"
                name=""
                id="newTodo"
                placeholder={placeholder}
                value={ todo }
                onChange={ (e) => setTodo( e.target.value ) }
            />
            <button  className='bg-cyan-700 px-2 py-2 rounded-r-lg cursor-pointer w-32 flex align-middle justify-center font-bold'  onClick={ () => handleAddTodo() } >Add Todo</button>
        </header>
    )
}

export default TodoAdd
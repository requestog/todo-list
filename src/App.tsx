import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import React, {useState} from "react";
import TodoForm from "@/TodoForm";

function App() {
    const [todos, setTodos] = useState([
        {id: 1, title: 'js'}, {id: 2, title: 'react'}
    ]);

    const createTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="h-screen bg-gray-50">
            <div className="container mx-auto max-w-5xl">
                <Header/>
                <TodoForm create={createTodo} />
                <TodoList remove={removeTodo} todos={todos}/>
            </div>
        </div>
    )
}

export default App

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import React, {useState} from "react";
import TodoForm from "./components/TodoForm";
import Input from "./components/UI/Input";
import Button from "./components/UI/Button";

function App() {
    const [todos, setTodos] = useState<Todo[]>([
        {id: 1, title: 'js'},
        {id: 2, title: 'react'}
    ]);

    const createTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App h-screen bg-gray-50">
            <div className="container mx-auto max-w-5xl">
                <Header/>
                <TodoForm create={createTodo}/>
                {
                    todos.length !== 0 ?
                        <TodoList remove={removeTodo} todos={todos}/>
                        :
                        <div
                            className="max-w-5xl mx-auto p-5 mt-10 text-center text-lg text-gray-500 border-2 border-gray-100 rounded-lg shadow">
                            Задачи не были найдены
                        </div>
                }
            </div>
            <div className="mt-10 max-w-md mx-auto p-5 rounded-lg shadow">
                <div className="container mx-auto max-w-sm">
                    <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                        ВХОД
                    </h1>
                    <form className="flex flex-col w-full gap-4">
                        <Input
                            type="email"
                            placeholder="email"
                        />
                        <Input
                            type="password"
                            placeholder="password"
                        />
                        <Button>Войти</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default App

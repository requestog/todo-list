import {useState} from 'react';
import Header from "../components/Header.tsx";
import TodoForm from "../components/TodoForm.tsx";
import TodoList from "../components/TodoList.tsx";

interface Todo {
    id: number;
    title: string;
}

const Main = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: 'js' },
        { id: 2, title: 'react' }
    ]);

    const createTodo = (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App h-screen bg-gray-50">
            <div className="container mx-auto max-w-5xl">
                <Header />
                <TodoForm create={createTodo} />
                {
                    todos.length !== 0 ?
                        <TodoList remove={removeTodo} todos={todos} />
                        :
                        <div className="max-w-5xl mx-auto p-5 mt-10 text-center text-lg text-gray-500 border-2 border-gray-100 rounded-lg shadow">
                            Задачи не были найдены
                        </div>
                }
            </div>
        </div>
    );
};

export default Main;
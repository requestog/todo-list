import {useContext, useEffect, useState} from 'react';
import Header from "../components/Header.tsx";
import TodoForm from "../components/TodoForm.tsx";
import TodoList from "../components/TodoList.tsx";
import TodoService from "../services/TodoService.ts";
import {Context} from "../AppContext.ts";
import type Todo from "../models/ITodo.ts";

const Main = () => {
    const {userStore} = useContext(Context);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    const createTodo = (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                if (!userStore.user._id) return;

                const todos = await TodoService.getTodos(userStore.user._id);
                setTodos(todos);
            } catch (error) {
                console.error("Ошибка при загрузке todos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [userStore.user._id]);

    return (
        <div className="App h-screen bg-gray-50">
            <div className="container mx-auto max-w-5xl">
                <Header />
                <TodoForm create={createTodo} />
                {loading ? (
                    <div className="flex justify-center items-center mt-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : todos.length !== 0 ? (
                    <TodoList remove={removeTodo} todos={todos} />
                ) : (
                    <div className="max-w-5xl mx-auto p-5 mt-10 text-center text-lg text-gray-500 border-2 border-gray-100 rounded-lg shadow">
                        Задачи не были найдены
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
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
    const [checkedTodos, setCheckedTodos] = useState<Record<string, boolean>>({});


    const createTodo = async (todoData: { id: number; title: string }) => {
        try {
            if (!userStore.user._id) return;
            const response = await TodoService.createTodo(userStore.user._id, todoData.title);
            const createdTodo = response.data;
            setTodos([...todos, createdTodo]);
        } catch (error) {
            console.error("Ошибка при создании todo:", error);
        }
    };

    const removeTodo = async (_id: number) => {
        try {
            await TodoService.removeTodo(_id);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== _id));
        } catch (error) {
            console.error("Ошибка при удалении todo:", error);
        }
    };

    const updateTodo = async (_id: string, newTitle: string) => {
        try {
            await TodoService.updateTodo(_id, newTitle);

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === _id ? { ...todo, title: newTitle } : todo
                )
            );
        } catch (error) {
            console.error("Ошибка при обновлении todo:", error);
        }
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

    useEffect(() => {
        const saved = localStorage.getItem('checkedTodos');
        if (saved) {
            setCheckedTodos(JSON.parse(saved));
        }
    }, []);

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
                    <TodoList
                        remove={removeTodo}
                        update={updateTodo}
                        todos={todos}
                        checkedTodos={checkedTodos}
                        setCheckedTodos={setCheckedTodos}
                    />
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
import React from 'react';
import TodoItem from "./TodoItem.tsx";

interface Todo {
    id: number;
    title: string;
}

interface TodoListProps {
    todos: Todo[];
    remove: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, remove }) => {
    return (
        <div className="max-w-5xl border-2 border-gray-100 rounded-lg p-5 mt-10 mx-auto shadow">
            {todos.map((todo) => (
                <TodoItem remove={remove} key={todo.id} todo={todo}/>
            ))}
        </div>
    );
};

export default TodoList;
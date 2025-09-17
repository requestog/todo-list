import React from 'react';
import TodoItem from "./TodoItem.tsx";
import type Todo from "../models/ITodo.ts";

interface TodoListProps {
    todos: Todo[];
    remove: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, remove }) => {
    return (
        <div className="max-w-5xl border-2 border-gray-100 rounded-lg p-5 mt-10 mx-auto shadow">
            {todos.map((todo) => {
                return <TodoItem remove={remove} key={todo._id} todo={todo} />;
            })}
        </div>
    );
};

export default TodoList;
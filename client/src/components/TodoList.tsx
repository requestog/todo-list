import React from 'react';
import TodoItem from "./TodoItem.tsx";
import type Todo from "../models/ITodo.ts";

interface TodoListProps {
    todos: Todo[];
    remove: (id: string) => void;
    update: (id: string, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, remove, update }) => {
    return (
        <div className="max-w-5xl border-2 border-gray-100 rounded-lg p-5 mt-10 mx-auto shadow">
            {todos.map(todo => (
                <TodoItem remove={remove} update={update} key={todo._id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
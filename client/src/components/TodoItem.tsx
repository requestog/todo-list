import React, { useState } from "react";
import Button from "./UI/Button.tsx";
import Input from "./UI/Input.tsx";
import type Todo from "../models/ITodo.ts";


interface TodoItemProps {
    todo: Todo;
    remove: (id: number) => void;
    update: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, remove, update }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleSave = () => {
        if (newTitle.trim() !== "") {
            update(todo._id, newTitle.trim());
        }
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between gap-2 p-5 mb-5 border rounded-lg text-lg border-gray-100">
            <div className="flex items-center gap-2 flex-1">
                <input
                    type="checkbox"
                    id={`todo-${todo._id}`}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                {isEditing ? (
                    <Input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        autoFocus
                    />
                ) : (
                    <label
                        htmlFor={`todo-${todo._id}`}
                        className="text-gray-700 flex-1 break-words"
                    >
                        {todo.title}
                    </label>
                )}
            </div>
            <div className="flex items-center gap-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave}>Сохранить</Button>
                        <Button danger onClick={() => setIsEditing(false)}>
                            Отмена
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setIsEditing(true)}>Изменить</Button>
                        <Button danger onClick={() => remove(todo._id)}>
                            Удалить
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;

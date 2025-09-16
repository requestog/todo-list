import React from 'react';
import Button from "./UI/Button.tsx";

interface TodoItemProps {
    todo: {
        id: number;
        title: string;
    };
    remove: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, remove}) => {
    return (
        <div
            className="flex items-center justify-between gap-2 p-5 mb-5 border-solid rounded-lg text-center text-lg border-2 border-gray-100">
            <div className="flex items-center gap-2 checkbox">
                <input
                    type="checkbox"
                    id="myCheckbox"
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="myCheckbox" className="text-gray-700">
                    {todo.title}
                </label>
            </div>
            <Button danger onClick={() => remove(todo.id)}>
                Удалить
            </Button>

        </div>
    );
};

export default TodoItem;
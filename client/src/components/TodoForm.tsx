import React, { useState } from 'react';
import Dropdown from "./UI/DropDown.tsx";
import Input from "./UI/Input.tsx";
import Button from "./UI/Button.tsx";

interface TodoFormProps {
    create: (todo: { id: number; title: string }) => void;
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ create, onFilterChange }) => {
    const [title, setTitle] = useState("");

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            id: Date.now(),
            title: title,
        };
        create(newTodo);
        setTitle("");
    };

    return (
        <div className="mt-10 max-w-5xl mx-auto p-5 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Dropdown
                    className="w-full sm:w-40"
                    items={[
                        { id: 1, label: 'Все' },
                        { id: 2, label: 'Активные' },
                        { id: 3, label: 'Выполненные' },
                    ]}
                    defaultValue={{ id: 1, label: 'Все' }}
                    onSelect={(item) => {
                        let value: 'all' | 'active' | 'completed' = 'all';
                        if (item.id === 2) value = 'active';
                        if (item.id === 3) value = 'completed';
                        onFilterChange(value);
                    }}
                />

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <form className="flex flex-col sm:flex-row gap-2 flex-1" onSubmit={addTodo}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Введите текст..."
                        />
                        <Button type="submit" className="sm:mt-0 mt-2">Добавить</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodoForm;
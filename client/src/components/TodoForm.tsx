import React, { useState } from 'react';
import Dropdown from "./UI/DropDown.tsx";
import Input from "./UI/Input.tsx";
import Button from "./UI/Button.tsx";

interface TodoFormProps {
    create: (todo: { id: number; title: string }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ create }) => {
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
            <div className="flex gap-2">
                <Dropdown
                    items={[
                        { id: 1, label: 'Все' },
                        { id: 2, label: 'Активные' },
                        { id: 3, label: 'Выполненные' },
                    ]}
                    defaultValue={{ id: 1, label: 'Все' }}
                    onSelect={(item) => console.log('Selected:', item)}
                />

                <div className="flex items-center gap-2 w-full">
                    <form className="flex gap-2 w-full" onSubmit={addTodo}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Введите текст..."
                        />
                        <Button type="submit">Добавить</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodoForm;
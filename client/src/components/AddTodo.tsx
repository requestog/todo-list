import React from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void; // функция, вызываемая при добавлении todo
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Введите текст..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddTodo;
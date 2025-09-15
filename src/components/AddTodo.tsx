import React from 'react';

const AddTodo = ({props}) => {
    return (
        <div className="flex items-center gap-2 w-full">
            <form className="flex gap-2 w-full">
            <input
                type="text"
                placeholder="Введите текст..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                Добавить
            </button>
        </form>
        </div>
    );
};

export default AddTodo;
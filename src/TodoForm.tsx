import React, {useState} from 'react';
import Dropdown from "@/components/UI/DropDown";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const TodoForm = ({create}) => {
    const [title, setTitle] = useState("");

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            id: Date.now(),
            title: title,
        }
        create(newTodo)
        setTitle("");
    }

    return (
        <div className="mt-10 max-w-5xl mx-auto p-5 rounded-lg shadow">
            <div className="flex gap-2">
                <Dropdown/>
                <div className="flex items-center gap-2 w-full">
                    <form className="flex gap-2 w-full">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Введите текст..."
                        />
                        <Button onClick={addTodo}>Добавить</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodoForm;
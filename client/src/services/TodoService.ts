import $api from "../http";
import type Todo from "../models/ITodo.ts";

export default class TodoService {
    static async getTodos(userId: number | string): Promise<Todo[]> {
        const { data } = await $api.get<Todo[]>(`/api/todo/getAllbyID/${userId}`);
        return data;
    }

    static async createTodo(userId: string, title: string): Promise<{ data: Todo }> {
        const response = await $api.post('/api/todo/create', { userId, title });
        return response.data;
    }

    static async removeTodo(_id: string): Promise<void> {
        console.log(_id);
        await $api.delete(`/api/todo/delete/${_id}`);
    }

    static async updateTodo(_id: string, title: string): Promise<void> {
        await $api.put<Todo>(`/api/todo/update/${_id}`, {
            _id,
            title
        });
    }
}
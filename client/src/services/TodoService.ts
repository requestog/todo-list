import $api from "../http";
import type Todo from "../models/ITodo.ts";

export default class TodoService {
    static async getTodos(userId: number | string): Promise<Todo[]> {
        const { data } = await $api.get<Todo[]>(`/api/todo/getAllbyID/${userId}`);
        return data;
    }

    static async createTodo(userId: number, title: string): Promise<Todo> {
        const { data } = await $api.post<Todo>('/api/todo/create', {
            userId,
            title
        });
        return data;
    }

    static async removeTodo(_id: number): Promise<void> {
        console.log(_id);
        await $api.delete(`/api/todo/delete/${_id}`);
    }

    static async updateTodo(_id: number, title: string): Promise<void> {
        await $api.put<Todo>(`/api/todo/update/${_id}`, {
            _id,
            title
        });
    }
}
import $api from "../http";
import type Todo from "../models/ITodo.ts";

export default class TodoService {
    static async getTodos(userId: number | string) {
        const { data } = await $api.get<Todo[]>(`/api/todo/getAllbyID/${userId}`);
        return data;
    }
}
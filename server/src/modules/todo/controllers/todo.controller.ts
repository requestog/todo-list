import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TodoService} from "../services/todo.service";
import {TodoDto} from "../dto/todo.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {Todo} from "../models/todo.model";
import {ITodo} from "../interfaces/ITodo";

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Post('/create')
    async create(@Body() dto: TodoDto): Promise<{message: string, data: ITodo}> {
        const data = await this.todoService.create(dto);
        return { message: "Задача успешно создана", data }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        await this.todoService.delete(id);
        return { message: `Задача ${id} удалена` }
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() dto: { title?: string }): Promise<{ message: string }> {
        await this.todoService.updateTitle(id, dto.title);
        return { message: `Задача ${id} обновлена` }
    }

    @Get('/getAllbyID/:id')
    async getAllbyID(@Param('id') id: string): Promise<Todo[]> {
        const todos: Todo[] = await this.todoService.getAllbyID(id);
        return todos;
    }
}

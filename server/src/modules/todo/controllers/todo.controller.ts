import {Body, Controller, Delete, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TodoService} from "../services/todo.service";
import {TodoDto} from "../dto/todo.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Post('/create')
    async create(@Body() dto: TodoDto): Promise<{ message: string }> {
        await this.todoService.create(dto);
        return { message: "Задача успешно создана" }
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
}

import {Body, Controller, Delete, Param, Post, Put} from '@nestjs/common';
import {TodoService} from "../services/todo.service";
import {TodoDto} from "../dto/todo.dto";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('/create')
    async create(@Body() dto: TodoDto,): Promise<void> {
        await this.todoService.create(dto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.todoService.delete(id);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() dto: { title?: string }): Promise<void> {
        await this.todoService.updateTitle(id, dto.title);
    }
}

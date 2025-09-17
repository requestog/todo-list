import {
    Body, Controller, Delete, Get, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from "../services/todo.service";
import { TodoDto } from "../dto/todo.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Todo } from "../models/todo.model";
import { ITodo } from "../interfaces/ITodo";

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Создать задачу' })
    @ApiBody({ type: TodoDto })
    @ApiResponse({ status: 201, description: 'Задача успешно создана', type: Todo })
    async create(@Body() dto: TodoDto): Promise<{ message: string; data: ITodo }> {
        const data = await this.todoService.create(dto);
        return { message: "Задача успешно создана", data };
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Удалить задачу' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Задача удалена' })
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        await this.todoService.delete(id);
        return { message: `Задача ${id} удалена` };
    }

    @Put('/update/:id')
    @ApiOperation({ summary: 'Обновить задачу' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Задача обновлена' })
    async update(
        @Param('id') id: string,
        @Body() dto: { title?: string }
    ): Promise<{ message: string }> {
        await this.todoService.updateTitle(id, dto.title);
        return { message: `Задача ${id} обновлена` };
    }

    @Get('/getAllbyID/:id')
    @ApiOperation({ summary: 'Получить все задачи пользователя' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Список задач', type: [Todo] })
    async getAllbyID(@Param('id') id: string): Promise<Todo[]> {
        return this.todoService.getAllbyID(id);
    }
}

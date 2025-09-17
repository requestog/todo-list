import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Todo} from "../models/todo.model";
import {TodoDto} from "../dto/todo.dto";

@Injectable()
export class TodoService {
    private readonly logger: Logger = new Logger('TodoService');

    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {
    }

    async create(dto: TodoDto): Promise<void> {
        try {
            await this.todoModel.create({...dto});
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to create todo');
        }
    }

    async delete(id: string) {
        try {
            await this.todoModel.deleteOne({_id: id});
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed delete todo');
        }
    }

    async updateTitle(id: string, newTitle?: string): Promise<void> {
        try {
            await this.todoModel.findByIdAndUpdate(id, {title: newTitle});
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed update todo');
        }
    }
}

import {Module} from '@nestjs/common';
import {TodoController} from "./controllers/todo.controller";
import {TodoService} from "./services/todo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Todo, TodoSchema} from "./models/todo.model";

@Module({
    controllers: [TodoController],
    imports: [MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}])],
    providers: [TodoService],
})

export class TodoModule {}

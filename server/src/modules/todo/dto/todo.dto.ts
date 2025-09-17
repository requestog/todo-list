import { IsString, IsBoolean, IsNotEmpty, IsMongoId } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class TodoDto {
    @ApiProperty({ example: 'Купить молоко', description: 'Название задачи' })
    @IsNotEmpty({ message: 'Поле userId не должно быть пустым' })
    @IsMongoId({ message: 'userId должен быть валидным MongoDB ObjectId' })
    userId: string;

    @ApiProperty({ example: '64abf0b9c2...', description: 'ID пользователя' })
    @IsNotEmpty({ message: 'Поле title не должно быть пустым' })
    @IsString({ message: 'title должен быть строкой' })
    title: string;

    @IsBoolean({ message: 'completed должно быть булевым значением' })
    completed?: boolean;
}
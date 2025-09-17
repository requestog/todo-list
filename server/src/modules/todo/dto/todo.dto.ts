import { IsString, IsBoolean, IsNotEmpty, IsMongoId } from 'class-validator';

export class TodoDto {
    @IsNotEmpty({ message: 'Поле userId не должно быть пустым' })
    @IsMongoId({ message: 'userId должен быть валидным MongoDB ObjectId' })
    userId: string;

    @IsNotEmpty({ message: 'Поле title не должно быть пустым' })
    @IsString({ message: 'title должен быть строкой' })
    title: string;

    @IsBoolean({ message: 'completed должно быть булевым значением' })
    completed?: boolean;
}
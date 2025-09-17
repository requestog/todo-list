import { IsString, IsBoolean, IsNotEmpty, IsMongoId } from 'class-validator';

export class TodoDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    completed?: boolean;
}
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'Имя пользователя (уникальное)',
    })
    @IsString()
    @IsNotEmpty({ message: 'Поле username не может быть пустым.' })
    readonly username: string;

    @ApiProperty({
        example: 'StrongPass123!',
        description:
            'Пароль (минимум 10 символов, хотя бы 1 заглавная, 1 строчная, цифра или спецсимвол)',
    })
    @IsString({ message: 'Пароль должен быть строкой.' })
    @IsNotEmpty({ message: 'Поле password не может быть пустым.' })
    @MinLength(10, { message: 'Пароль должен содержать не менее 10 символов.' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Пароль не соответствует требованиям:' +
            ' должно содержать заглавную букву,' +
            ' строчную букву и цифру или специальный символ.',
    })
    readonly password: string;
}

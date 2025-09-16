import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthDto {
    @IsString()
    @IsNotEmpty({ message: 'Поле username не может быть пустым.' })
    readonly username: string;

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

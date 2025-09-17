import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
    @IsString({ message: 'idSession должен быть строкой' })
    @IsNotEmpty({ message: 'idSession не должен быть пустым' })
    idSession: string;
}
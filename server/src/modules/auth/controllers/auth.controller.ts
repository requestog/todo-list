import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';
import { IAuthResponsePublic } from '../interfaces/IAuthResponsePublic';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { Request, Response } from 'express';
import { LogoutDto } from '../dto/logout.dto';
import { ISaveUser } from '../../user/interfaces/ISaveUser';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
    ) {}

    @Post('/registration')
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiBody({ type: AuthDto })
    @ApiResponse({ status: 201, description: 'Успешная регистрация' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации' })
    async registration(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ): Promise<IAuthResponsePublic> {
        const ipAddress: string | undefined = req.ip;
        const userAgent: string | undefined = req.headers['user-agent'];

        const authResponse: IAuthResponse = await this.authService.registration(
            dto,
            ipAddress,
            userAgent,
        );

        this.cookieService.setRefreshToken(res, authResponse.tokens.refreshToken);
        return {
            user: authResponse.user,
            accessToken: authResponse.tokens.accessToken,
            idSession: authResponse.idSession,
        };
    }

    @Post('/login')
    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiBody({ type: AuthDto })
    @ApiResponse({ status: 200, description: 'Успешный вход' })
    @ApiResponse({ status: 401, description: 'Неверные данные' })
    async login(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ): Promise<IAuthResponsePublic> {
        const ipAddress: string | undefined = req.ip;
        const userAgent: string | undefined = req.headers['user-agent'];

        const authResponse: IAuthResponse = await this.authService.login(
            dto,
            ipAddress,
            userAgent,
        );

        this.cookieService.setRefreshToken(res, authResponse.tokens.refreshToken);
        return {
            user: authResponse.user,
            accessToken: authResponse.tokens.accessToken,
            idSession: authResponse.idSession,
        };
    }

    @Get('/refresh')
    @ApiOperation({ summary: 'Обновление access токена' })
    @ApiResponse({ status: 200, description: 'Токен обновлен' })
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<IAuthResponsePublic> {
        const { refreshToken } = req.cookies;

        const ipAddress: string | undefined = req.ip;
        const userAgent: string | undefined = req.headers['user-agent'];

        const authResponse: IAuthResponse = await this.authService.updateRefreshToken(
            {
                refreshToken,
                userAgent,
                ipAddress,
            },
        );

        this.cookieService.setRefreshToken(res, authResponse.tokens.refreshToken);
        return {
            user: authResponse.user,
            accessToken: authResponse.tokens.accessToken,
            idSession: authResponse.idSession,
        };
    }

    @Post('/logout')
    @ApiOperation({ summary: 'Выход из системы' })
    @ApiBody({ type: LogoutDto })
    @ApiResponse({ status: 200, description: 'Сессия завершена' })
    async logout(
        @Body() dto: LogoutDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        this.cookieService.clearRefreshToken(res);
        await this.authService.removeSession(dto.idSession);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    @ApiOperation({ summary: 'Получить данные текущего пользователя' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Информация о пользователе' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    getMe(@Req() req: Request): ISaveUser {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        const { _id, username } = req.user as ISaveUser;
        return { _id, username };
    }
}

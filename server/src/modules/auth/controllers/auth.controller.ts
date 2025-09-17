import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthDto} from "../dto/auth.dto";
import {IAuthResponsePublic} from "../interfaces/IAuthResponsePublic";
import {IAuthResponse} from "../interfaces/IAuthResponse";
import {AuthService} from "../services/auth.service";
import {CookieService} from "../services/cookie.service";
import {Request, Response} from 'express';
import {LogoutDto} from "../dto/LogoutDto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
    ) {
    }

    @Post('/registration')
    async registration(
        @Body() dto: AuthDto,
        @Res({passthrough: true}) res: Response,
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
    async login(
        @Body() dto: AuthDto,
        @Res({passthrough: true}) res: Response,
        @Req() req: Request,
    ): Promise<IAuthResponsePublic> {
        const ipAddress: string | undefined = req.ip;
        const userAgent: string | undefined = req.headers['user-agent'];

        const authResponse: IAuthResponse = await this.authService.login(dto, ipAddress, userAgent);

        this.cookieService.setRefreshToken(res, authResponse.tokens.refreshToken);
        return {
            user: authResponse.user,
            accessToken: authResponse.tokens.accessToken,
            idSession: authResponse.idSession,
        };
    }

    @Get('/refresh')
    async refresh(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
    ): Promise<IAuthResponsePublic> {
        const {refreshToken} = req.cookies;

        const ipAddress: string | undefined = req.ip;
        const userAgent: string | undefined = req.headers['user-agent'];

        const authResponse: IAuthResponse = await this.authService.updateRefreshToken({
            refreshToken,
            userAgent,
            ipAddress,
        });

        this.cookieService.setRefreshToken(res, authResponse.tokens.refreshToken);
        return {
            user: authResponse.user,
            accessToken: authResponse.tokens.accessToken,
            idSession: authResponse.idSession,
        };
    }

    @Post('/logout')
    async logout(
        @Body() dto: LogoutDto,
        @Res({passthrough: true})
        res: Response,
    ): Promise<void> {
        this.cookieService.clearRefreshToken(res);
        await this.authService.removeSession(dto.idSession);
    }
}

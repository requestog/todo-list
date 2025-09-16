import {
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ISaveUser } from '../../user/interfaces/ISaveUser';
import { ITokens } from '../interfaces/ITokens';
import ms from 'ms';
import { StringValue } from 'ms';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRefreshPayload } from '../interfaces/IRefreshPayload';
import { IAccessPayload } from '../interfaces/IAccessPayload';
import {Session} from "../models/session.model";

@Injectable()
export class TokenService {
    private readonly logger: Logger = new Logger('TokenService');

    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateTokens(user: ISaveUser): Promise<ITokens> {
        const accessPayload: IAccessPayload = {
            username: user.username,
            sub: user._id.toString(),
        };
        const refreshPayload: IRefreshPayload = {
            username: user.username,
            sub: user._id.toString(),
        };

        const accessSecret: string | undefined = this.configService.get<string>('JWT_ACCESS_SECRET');
        const accessExpiration: string | undefined =
            this.configService.get<string>('JWT_ACCESS_EXPIRATION');

        const refreshSecret: string | undefined = this.configService.get<string>('JWT_REFRESH_SECRET');
        const refreshExpiration: string | undefined =
            this.configService.get<string>('JWT_REFRESH_EXPIRATION');

        if (!accessSecret || !accessExpiration || !refreshSecret || !refreshExpiration) {
            this.logger.error('JWT configuration is missing');
            throw new InternalServerErrorException('Server configuration error');
        }

        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(accessPayload, {
                    secret: accessSecret,
                    expiresIn: accessExpiration,
                }),
                this.jwtService.signAsync(refreshPayload, {
                    secret: refreshSecret,
                    expiresIn: refreshExpiration,
                }),
            ]);

            return { accessToken, refreshToken };
        } catch (error) {
            this.logger.error(`Error generating tokens`, error);
            throw new InternalServerErrorException('Could not generate tokens');
        }
    }

    calculateSessionExpirationDate(): Date {
        const refreshExpirationString: string | undefined =
            this.configService.get<string>('JWT_REFRESH_EXPIRATION');

        if (!refreshExpirationString) {
            throw new InternalServerErrorException(
                'Refresh token expiration (JWT_REFRESH_EXPIRATION) is not configured.',
            );
        }

        try {
            const expiresInMilliseconds: number = ms(refreshExpirationString as StringValue);

            if (isNaN(expiresInMilliseconds)) {
                throw new Error('Invalid format for JWT_REFRESH_EXPIRATION');
            }

            return new Date(Date.now() + expiresInMilliseconds);
        } catch (error) {
            this.logger.error(
                `Failed to parse JWT_REFRESH_EXPIRATION value: "${refreshExpirationString}": ${error}`,
            );

            throw new InternalServerErrorException(
                `Invalid format for JWT_REFRESH_EXPIRATION: "${refreshExpirationString}".
         Use formats like '7d', '2h', '30m'.`,
            );
        }
    }

    async validateRefreshToken(
        refreshToken: string,
    ): Promise<{ session: Session; payload: IRefreshPayload }> {
        try {
            const refreshSecret: string | undefined =
                this.configService.get<string>('JWT_REFRESH_SECRET');
            if (!refreshSecret) {
                throw new InternalServerErrorException('Refresh secret not configured.');
            }

            const payload: IRefreshPayload = await this.jwtService.verifyAsync(refreshToken, {
                secret: refreshSecret,
            });

            const session: Session = (await this.sessionModel
                .findOne({ refreshToken: refreshToken })
                .exec()) as unknown as Session;

            if (!payload || !session) {
                throw new UnauthorizedException('Session not found or token mismatch.');
            }

            if (session.expiresAt < new Date()) {
                await this.sessionModel.deleteOne({ _id: session._id });
                throw new UnauthorizedException('Session expired.');
            }

            return { session, payload };
        } catch (error) {
            this.logger.error(`Failed to validate refresh token: ${error}`);
            throw new InternalServerErrorException('Failed to validate refresh token');
        }
    }
}

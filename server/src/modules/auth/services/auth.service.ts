import {Injectable, InternalServerErrorException, Logger, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "../dto/auth.dto";
import {IAuthResponse} from "../interfaces/IAuthResponse";
import {InjectModel} from "@nestjs/mongoose";
import {UserService} from "../../user/services/user.service";
import {TokenService} from "./token.service";
import {ISaveUser} from "../../user/interfaces/ISaveUser";
import {ITokens} from "../interfaces/ITokens";
import {Model} from "mongoose";
import {Session} from "../models/session.model";
import {ISessionSaveProperties} from "../interfaces/ISessionSaveProperties";
import * as bcrypt from 'bcryptjs';
import {IRefreshTokenProperties} from "../interfaces/IRefreshTokenProperties";

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger('AuthService');

    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {
    }

    async registration(
        dto: AuthDto,
        ipAddress: string | undefined,
        userAgent: string | undefined,
    ): Promise<IAuthResponse> {
        try {
            const user: ISaveUser = await this.userService.create(dto);
            const tokens: ITokens = await this.tokenService.generateTokens(user);
            this.logger.verbose(`Creating user with id ${user._id.toString()}`);

            const idSession: string = await this.saveSession({
                userId: user._id,
                refreshToken: tokens.refreshToken,
                ipAddress,
                userAgent,
            });
            this.logger.verbose(`User registration in successfully ${idSession}`);

            return {tokens, user, idSession};
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to registration');
        }
    }

    private async saveSession(options: ISessionSaveProperties): Promise<string> {
        try {
            const expiresAt: Date = this.tokenService.calculateSessionExpirationDate();
            const session: Session = new this.sessionModel({
                ...options,
                expiresAt,
            });
            const {_id} = await session.save();
            this.logger.verbose(`Save session`);
            return _id.toString();
        } catch (error) {
            this.logger.error('Failed to save session', error);
            throw new InternalServerErrorException('Failed to save session');
        }
    }

    async login(
        dto: AuthDto,
        ipAddress: string | undefined,
        userAgent: string | undefined,
    ): Promise<IAuthResponse> {
        try {
            const user: ISaveUser = await this.validateUser(dto);
            const tokens: ITokens = await this.tokenService.generateTokens(user);
            const idSession: string = await this.saveSession({
                userId: user._id,
                refreshToken: tokens.refreshToken,
                ipAddress,
                userAgent,
            });
            this.logger.verbose(`User logged in successfully ${user}`);
            return {tokens, user, idSession};
        } catch (error) {
            throw new InternalServerErrorException(`Failed to login ${error}`);
        }
    }

    private async validateUser(dto: AuthDto): Promise<ISaveUser> {
        const user: ISaveUser = await this.userService.getSaveUserUserName(dto.username);
        if (!user) {
            this.logger.error(`User not found ${dto.username}`);
            throw new InternalServerErrorException('User not found');
        }
        const password: string = await this.userService.getUserPasswordById(user._id.toString());
        const isPasswordMatching: boolean = bcrypt.compareSync(dto.password, password);

        if (!isPasswordMatching) {
            this.logger.error(`Invalid password ${user.username}`);
            throw new InternalServerErrorException('Invalid password');
        }

        return user;
    }

    async updateRefreshToken(options: IRefreshTokenProperties): Promise<IAuthResponse> {
        try {
            if (!options.refreshToken) {
                throw new UnauthorizedException('Refresh token not found in cookie.');
            }

            const {session, payload} = await this.tokenService.validateRefreshToken(
                options.refreshToken,
            );

            const user: ISaveUser | null = await this.userService.getSaveUserById(payload.sub);

            const tokens: ITokens = await this.tokenService.generateTokens(user);
            const idSession = session._id.toString();
            this.logger.verbose(`SESSION ID ${idSession}`);
            await this.updateSession({
                id: session._id,
                userId: user._id,
                refreshToken: tokens.refreshToken,
                ipAddress: options.ipAddress,
                userAgent: options.userAgent,
            });

            return {tokens, user, idSession};
        } catch (error) {
            this.logger.error(`Failed to update refresh token ${error}`);
            throw new InternalServerErrorException(`Failed to update refresh token ${error}`);
        }
    }

    private async updateSession(options: ISessionSaveProperties): Promise<void> {
        try {
            const expiresAt: Date = this.tokenService.calculateSessionExpirationDate();
            await this.sessionModel
                .findOneAndUpdate(
                    {_id: options.id},
                    {
                        $set: {
                            ...options,
                            expiresAt,
                        },
                    },
                    {new: true, upsert: false},
                )
                .exec();
            this.logger.verbose(`Update session`);
        } catch (error) {
            this.logger.error('Failed to update session', error);
            throw new InternalServerErrorException('Failed to update session');
        }
    }
}

import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {AuthDto} from "../dto/auth.dto";
import {IAuthResponse} from "../interfaces/IAuthResponse";
import {InjectModel} from "@nestjs/mongoose";
import {UserService} from "../../user/user.service";
import {TokenService} from "./token.service";
import {ISaveUser} from "../../user/interfaces/ISaveUser";
import {ITokens} from "../interfaces/ITokens";
import {Model} from "mongoose";
import {Session} from "../models/session.model";
import {ISessionSaveProperties} from "../interfaces/ISessionSaveProperties";

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger('AuthService');

    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

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

            return { tokens, user, idSession };
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
            const { _id } = await session.save();
            this.logger.verbose(`Save session`);
            return _id.toString();
        } catch (error) {
            this.logger.error('Failed to save session', error);
            throw new InternalServerErrorException('Failed to save session');
        }
    }
}

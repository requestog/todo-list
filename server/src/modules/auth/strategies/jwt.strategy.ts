import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategyBase } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {ISaveUser} from "../../user/interfaces/ISaveUser";
import {UserService} from "../../user/user.service";
import {IAccessPayload} from "../interfaces/IAccessPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase, 'jwt') {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        const jwtFromRequest: (req: Request) => string | null =
            ExtractJwt.fromAuthHeaderAsBearerToken();
        const secretOrKey: string | undefined = configService.get<string>('JWT_ACCESS_SECRET');

        if (!secretOrKey) {
            throw new Error('JWT_ACCESS_SECRET is not configured');
        }
        super({
            jwtFromRequest,
            secretOrKey,
        });
    }

    async validate(payload: IAccessPayload): Promise<ISaveUser> {
        const user: ISaveUser = await this.userService.getSaveUserById(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            _id: user._id,
            username: user.username,
        };
    }
}

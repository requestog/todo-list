import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './services/token.service';
import { CookieService } from './services/cookie.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {Session, SessionSchema} from "./models/session.model";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    UserModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, CookieService, JwtService, JwtStrategy],
  exports: [AuthService, TokenService, CookieService, JwtService],
})
export class AuthModule {}

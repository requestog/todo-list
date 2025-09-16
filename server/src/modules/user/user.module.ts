import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models/user.model";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserService, MongooseModule],
})
export class UserModule {}

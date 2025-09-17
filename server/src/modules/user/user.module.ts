import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models/user.model";

@Module({
  providers: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserService, MongooseModule],
})
export class UserModule {}

import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./models/user.model";
import {Model} from "mongoose";
import {IUser} from "./interfaces/IUser";
import {ISaveUser} from "./interfaces/ISaveUser";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger('UserService');

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(dto: CreateUserDto): Promise<ISaveUser> {
        try {
            const user: IUser | null = await this.userModel.findOne({ where: { username: dto.username } });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }

            const passwordHash: string = this.hashPassword(dto.password);

            const newUser: IUser = new this.userModel({
                ...dto,
                password: passwordHash,
            });

            const savedUser: IUser = await newUser.save();
            const userData: ISaveUser = {
                _id: savedUser._id,
                username: savedUser.username,
            };

            return userData;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 5);
    }
}

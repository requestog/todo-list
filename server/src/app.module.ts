import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from "./modules/user/user.module";
import {DatabaseModule} from "./modules/database/database.module";
import {AuthModule} from "./modules/auth/auth.module";
import {TodoModule} from "./modules/todo/todo.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        UserModule,
        DatabaseModule,
        AuthModule,
        TodoModule,
    ],
})

export class AppModule {}

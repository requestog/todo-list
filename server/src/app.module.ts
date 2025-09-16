import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from "./modules/user/user.module";
import {DatabaseModule} from "./modules/database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        UserModule,
        DatabaseModule
    ],
})

export class AppModule {}

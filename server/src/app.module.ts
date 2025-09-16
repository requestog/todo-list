import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
    ],
    controllers: [],
    providers: [AppService],
})

export class AppModule {}

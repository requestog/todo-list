import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, Logger} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const logger: Logger = new Logger('AppService');
    const PORT: string | 5000 = process.env.PORT || 5000;
    app.enableCors({
        origin: (origin, callback) => {
            callback(null, true);
        },
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    await app.listen(PORT).then((): void => logger.log(`Server started on PORT ${PORT}`));
}

bootstrap();

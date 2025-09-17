import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const logger: Logger = new Logger('AppService');
    const PORT: string | number = process.env.PORT || 5000;

    app.enableCors({
        origin: (origin, callback) => {
            callback(null, true);
        },
        credentials: true,
    });

    app.setGlobalPrefix('api');
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('Документация API для Todo-приложения')
        .setVersion('1.0')
        .addBearerAuth() // JWT токены
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT).then((): void =>
        logger.log(`Server started on http://localhost:${PORT}`),
    );
}

bootstrap();

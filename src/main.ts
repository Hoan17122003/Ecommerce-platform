import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';

dotenv.config({ path: 'local.env' });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.use(
        session({
            secret: process.env.SECRETSESSION || 'hoan',
            resave: true,
            saveUninitialized: false,
            cookie: {
                secure: false,
            },
        }),
    );

    await app.listen(process.env.PORT, () => {
        console.log(`server listening on port ${process.env.PORT}`);
    });
}
bootstrap();

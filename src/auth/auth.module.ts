import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        DatabaseModule,
        AccountModule,
        PassportModule,
        JwtModule.register({
            secretOrPrivateKey: process.env.SECRETSESSION || '123123123@13231',
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}

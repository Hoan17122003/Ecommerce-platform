import { Module } from '@nestjs/common';


import { AuthService } from './auth.service'
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LocalStrategy } from './strategy/local.strategy';


@Module({
    imports: [DatabaseModule, AccountModule, JwtModule.register({})],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule { }

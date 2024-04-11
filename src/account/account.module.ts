import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NguoiBanHangEntity, NguoiMuaHangEntity } from 'src/database/Entity/index.entity';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { unknowProviders } from 'src/middleware/dynamic-providers.providers';
import { TaiKhoan as AccountEntity } from 'src/database/Entity/TaiKhoan.entity';
import { AccountService } from './account.service';
import { BuyerService } from 'src/buyer/buyer.service';
import { VenderService } from 'src/vender/vender.service';
import { AccountController } from './account.controller';
import { dataSource } from 'src/database/database.providers';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessTokenGuard } from 'src/auth/guard/JwtAccessAuth.guard';

@Module({
    imports: [DatabaseModule, JwtModule.register({})],
    providers: [
        unknowProviders('ACCOUNT_REPOSITORY', AccountEntity),
        {
            provide: 'BUYER',
            useFactory: (buyerService: BuyerService) => {
                return new BuyerService(dataSource.getRepository(NguoiMuaHangEntity));
            },
        },
        {
            provide: 'VENDER',
            useFactory: () => {
                return new VenderService(dataSource.getRepository(NguoiBanHangEntity));
            },
        },
        AccountService,
        AuthService,
        {
            provide: 'JwtAccessTokenGuard',
            useClass: JwtAccessTokenGuard,
        },
        JwtService,
    ],
    controllers: [AccountController],
    exports: [AccountService],
})
export class AccountModule {}

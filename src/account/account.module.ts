import { Module } from '@nestjs/common';


import { unknowProviders } from 'src/middleware/dynamic-providers.providers';
import { TaiKhoan as AccountEntity } from 'src/database/Entity/TaiKhoan.entity';
import { AccountService } from './account.service';
import { DatabaseModule } from 'src/database/database.module';
import { BuyerService } from 'src/buyer/buyer.service';
import { VenderService } from 'src/vender/vender.service';
import { AccountController } from './account.controller';

@Module({
    imports: [DatabaseModule],
    providers: [unknowProviders('ACCOUNT_REPOSITORY', AccountEntity),
        {
            provide: 'BUYER',
            useValue: BuyerService
        },
        {
            provide: "VENDER",
            useValue: VenderService
        }
        , AccountService,
    ],
    controllers: [AccountController],
    exports: [AccountService]
})
export class AccountModule { }

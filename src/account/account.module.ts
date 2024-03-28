import { Module } from '@nestjs/common';


import { unknowProviders } from 'src/middleware/dynamic-providers.providers';
import { TaiKhoan as AccountEntity } from 'src/database/Entity/TaiKhoan.entity';
import { AccountService } from './account.service';
import { DatabaseModule } from 'src/database/database.module';
import { BuyerService } from 'src/buyer/buyer.service';
import { VenderService } from 'src/vender/vender.service';
import { AccountController } from './account.controller';
import { VenderModule } from 'src/vender/vender.module';
import { BuyerModule } from 'src/buyer/buyer.module';
import { NguoiMuaHangRepository } from 'src/database/Repository/NguoiMuaHang.repository';
import { NguoiBanHangEntity, NguoiMuaHangEntity } from 'src/database/Entity/index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { dataSource } from 'src/database/database.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [DatabaseModule,],
    providers: [unknowProviders('ACCOUNT_REPOSITORY', AccountEntity),
    {
        provide: 'BUYER',
        useFactory: (buyerService: BuyerService) => {
            return new BuyerService(dataSource.getRepository(NguoiMuaHangEntity));
        }
    },
    {
        provide: "VENDER",
        useFactory: () => {
            return new VenderService(dataSource.getRepository(NguoiBanHangEntity));
        }
    }
        , AccountService,
    ],
    controllers: [AccountController],
    exports: [AccountService]
})
export class AccountModule { }

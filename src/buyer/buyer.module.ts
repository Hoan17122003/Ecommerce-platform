import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { unknowProviders } from '../middleware/dynamic-providers.providers'
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NguoiBanHangEntity } from 'src/database/Entity/index.entity';

@Module({
    imports: [DatabaseModule],
    providers: [unknowProviders('BUYER_REPOSITORY', NguoiBanHangEntity), BuyerService],
    controllers: [BuyerController],
    exports: [BuyerService]
})

// @Module({
//     imports: [TypeOrmModule.forFeature([Buyer])],
//     providers: [BuyerService],
//     controllers: [BuyerController]
// })
export class BuyerModule { }
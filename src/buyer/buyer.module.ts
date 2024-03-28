import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { unknowProviders } from '../middleware/dynamic-providers.providers'
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NguoiBanHangEntity } from 'src/database/Entity/index.entity';
import { VenderService } from 'src/vender/vender.service';


@Global()
@Module({
    imports: [DatabaseModule],
    providers: [unknowProviders('BUYER_REPOSITORY', NguoiBanHangEntity), BuyerService],
    controllers: [BuyerController],
    exports: [BuyerModule]
})

// @Module({
//     imports: [TypeOrmModule.forFeature([Buyer])],
//     providers: [BuyerService],
//     controllers: [BuyerController]
// })
export class BuyerModule { }
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';
import { VenderModule } from './vender/vender.module';
import { ProductModule } from './product/product.module';
import { BillModule } from './bill/bill.module';
import { TransportersModule } from './transporters/transporters.module';
import { PaymentModule } from './payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './account/account.module';
// import { AccountModule } from './account/account.module';

// -------------- service
import { AccountService } from './account/account.service';
import { BuyerService } from './buyer/buyer.service';
import { VenderService } from './vender/vender.service';

@Module({
    // imports: [DatabaseModule, AuthModule, BuyerModule, VenderModule, ProductModule, BillModule, TransportersModule, PaymentModule],
    imports: [DatabaseModule, BuyerModule, VenderModule, AccountModule, AuthModule],
})
export class AppModule { }

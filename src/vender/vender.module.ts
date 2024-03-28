import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { unknowProviders } from '../middleware/dynamic-providers.providers'
import { NguoiBanHangEntity } from 'src/database/Entity/index.entity';
import { VenderService } from './vender.service'

@Module({
    imports: [DatabaseModule],
    providers: [unknowProviders('NGUOIBANHANG_REPOSITORY', NguoiBanHangEntity), VenderService],
    exports: [VenderModule]
})
export class VenderModule { }

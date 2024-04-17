import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from 'src/database/database.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { unknowProviders } from 'src/middleware/dynamic-providers.providers';
import { SanPhamEntity } from 'src/database/Entity/index.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessTokenGuard } from 'src/auth/guard/JwtAccessAuth.guard';
import { AccountModule } from 'src/account/account.module';
@Module({
    imports: [DatabaseModule, AuthModule, AccountModule, JwtModule.register({})],
    providers: [
        unknowProviders('PRODUCT_REPOSITORY', SanPhamEntity),
        ProductService,
        AuthService,
        {
            provide: 'JwtAccessTokenGuard',
            useClass: JwtAccessTokenGuard,
        },
        JwtService,
    ],
    controllers: [ProductController],
})
export class ProductModule {}

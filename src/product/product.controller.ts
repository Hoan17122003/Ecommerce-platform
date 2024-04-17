import { Controller, Get, Post, UseGuards, Body, Session } from '@nestjs/common';

import { ProductService } from './product.service';
import { Public } from 'src/decorators/auth.decorators';
import { JwtAccessTokenGuard } from 'src/auth/guard/JwtAccessAuth.guard';
import { ProductDTO } from './dto/product.dto';
import { Roles } from 'src/decorators/role.decoratos';
import { RolesGuard } from 'src/auth/guard/roles.guard';

// @UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
@Controller('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @Public()
    @Get()
    async AllProduct() {
        console.log('hehehe')
        return this.productService.AllProduct();
    }

    @Roles('NguoiBanHang')
    @Post('createProduct')
    async createProduct(@Body() productDTO: ProductDTO, @Session() session: Record<any, string>) {
        try {
            const maNguoiBanHang = 2087;
            return this.productService.create(productDTO, maNguoiBanHang);
        } catch (error) {}
    }
}

import { Injectable, Inject } from '@nestjs/common';

import { SanPhamEntity } from 'src/database/Entity/index.entity';
import { SanPhamRepository } from 'src/database/Repository/SanPham.repository';
import { BaseService } from 'src/database/base.service';
import { ProductDTO } from './dto/product.dto';
import { findAllProduct, addProduct } from 'src/database/Repository/SanPham.repository';

@Injectable()
export class ProductService extends BaseService<SanPhamEntity, SanPhamRepository> {
    constructor(@Inject('PRODUCT_REPOSITORY') private readonly productRepository: SanPhamRepository) {
        super(productRepository);
    }

    async AllProduct() {
        return this.productRepository.find({
            select: {
                TenSanPham: true,
                GiaBan: true,
                AnhSanPham: true,
                MoTaSanPham: true,
                SoLuongSanPham: true,
                ThuongHieu: true,
                MaSanPham: true,
            },
            where: {},
        });
    }

//     async create(productDTO: ProductDTO, maNguoiBanHang: number): Promise<number | undefined> {
//         try {
//             const sanPham = new SanPhamEntity(
//                 productDTO.TenSanPham,
//                 productDTO.GiaBan,
//                 productDTO.AnhSanPham,
//                 productDTO.MoTaSanPham,
//                 productDTO.SoLuongSanPham,
//                 productDTO.ThuongHieu,
//             );
//             const result = await addProduct(sanPham, maNguoiBanHang);
//             return result;
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
// }

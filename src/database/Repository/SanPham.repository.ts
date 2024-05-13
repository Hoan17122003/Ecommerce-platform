import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { SanPhamEntity, TaiKhoanEntity } from '../Entity/index.entity';
import { dataSource } from '../database.providers';
import { ProductDTO } from 'src/product/dto/product.dto';

@EntityRepository(SanPhamEntity)
export class SanPhamRepository extends Repository<SanPhamEntity> {
    // public getInstance() {
    //     if (!SanPhamRepository.repository) {
    //         SanPhamRepository.repository = new SanPhamRepository();
    //     }
    //     return SanPhamRepository.repository;
    // }

    // create(): SanPhamEntity;
    // create(entityLikeArray: DeepPartial<SanPhamEntity>[]): SanPhamEntity[];
    // create(entityLike: DeepPartial<SanPhamEntity>): SanPhamEntity;
    // create(entityLike?: unknown): SanPhamEntity | SanPhamEntity[] {

    // }

    // the latest  version is not supported for this
    // async findAll() {
    //     const data = await this.createQueryBuilder().select('*').orderBy('GiaBan').getMany();
    //     console.log('data : ', data);

    //     return data;
    //     //  this.createQueryBuilder().select('*').orderBy('GiaBan').getMany();
    // }
}

export const findAllProduct = async (): Promise<SanPhamEntity> => {
    const sanPhamRepository = await dataSource.getRepository(TaiKhoanEntity);
    const products = await sanPhamRepository.createQueryBuilder().select('*').getMany();
    console.log('product : ', products);
    return products;
};

export const addProduct = async (product: SanPhamEntity, MaNguoiBanHang: number): Promise<number | undefined> => {
    const sanPhamRepository = await dataSource.getRepository(TaiKhoanEntity);

    console.log('product : ', product);
    console.log('gia : ', typeof MaNguoiBanHang);

    const productId: number = await sanPhamRepository.query(`
    execute proc_themSanPham_NguoiBanHang
        @MaNguoiBanHang = ${MaNguoiBanHang},
    	@TenSanPham = '${product.getTenSanPham()}',
    	@GiaBan = ${product.getGiaBan()},
    	@AnhSanPham = '${product.getAnhSanPham()}' ,
    	@MoTaSanPham = '${product.getMoTaSanPham()}' ,
    	@SoLuongSanPham = ${product.getSoLuongSanPham()},
    	@ThuongHieu = '${product.getThuongHieu()}',
    	@categoryId = N'A001'`);

    return productId;
};

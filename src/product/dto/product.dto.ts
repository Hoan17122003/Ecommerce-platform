import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    TenSanPham: string;

    @IsNotEmpty()
    GiaBan: number;

    @IsString()
    @IsNotEmpty()
    AnhSanPham: string;

    @IsString()
    @IsNotEmpty()
    MoTaSanPham: string;

    @IsNotEmpty()
    SoLuongSanPham: number;

    @IsString()
    @IsNotEmpty()
    ThuongHieu: string;
}

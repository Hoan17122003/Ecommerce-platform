import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BinhLuanDanhGia } from './BinhLuanDanhGia.entity';
import { ChiTietDonHang } from './ChiTietDonHang.entity';
import { ChiTietMaGiamGia } from './ChiTietMaGiamGia.entity';

@Entity('SanPham')
export class Product extends BaseEntity {
    public constructor(
        TenSanPham: string,
        GiaBan: number,
        AnhSanPham: string,
        MoTaSanPham: string,
        SoLuongSanPham: number,
        ThuongHieu: string,
    ) {
        super();
        this.TenSanPham = TenSanPham;
        this.GiaBan = GiaBan;
        this.AnhSanPham = AnhSanPham;
        this.MoTaSanPham = MoTaSanPham;
        this.SoLuongSanPham = SoLuongSanPham;
        this.ThuongHieu = ThuongHieu;
    }

    @PrimaryGeneratedColumn('identity')
    MaSanPham: number;

    @Column({
        type: 'nvarchar',
        length: 250,
    })
    TenSanPham: string;

    @Column({
        type: 'money',
    })
    GiaBan: number;

    @Column({
        type: 'nvarchar',
        length: 1000,
    })
    AnhSanPham: string;

    @Column({
        type: 'nvarchar',
        length: 500,
    })
    MoTaSanPham: string;

    @Column({
        type: 'int',
    })
    SoLuongSanPham: number;

    @Column({
        type: 'nvarchar',
        length: 250,
    })
    ThuongHieu: string;

    @OneToMany(() => BinhLuanDanhGia, (binhLuanDanhGia) => binhLuanDanhGia.product)
    binhLuanDanhGia: BinhLuanDanhGia[];

    @OneToMany(() => ChiTietDonHang, (chiTietDonHang) => chiTietDonHang.product)
    orderDetail: ChiTietDonHang[];

    @OneToMany(() => ChiTietMaGiamGia, (chiTietMaGiamGia) => chiTietMaGiamGia.product)
    chitietmagiamgia: ChiTietMaGiamGia[];

    public getGiaBan(): number {
        return this.GiaBan;
    }

    public getTenSanPham(): string {
        return this.TenSanPham;
    }

    public getAnhSanPham(): string {
        return this.AnhSanPham;
    }

    public getMoTaSanPham(): string {
        return this.MoTaSanPham;
    }
    public getSoLuongSanPham(): number {
        return this.SoLuongSanPham;
    }

    public getThuongHieu(): string {
        return this.ThuongHieu;
    }
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BinhLuanDanhGia } from "./BinhLuanDanhGia.entity";
import { ChiTietDonHang } from "./ChiTietDonHang.entity";
import { ChiTietMaGiamGia } from "./ChiTietMaGiamGia.entity";

@Entity('SanPham')
export class Product {
    @PrimaryGeneratedColumn('identity')
    MaSanPham: number

    @Column({
        type: 'nvarchar',
        length: 250,

    })
    TenSanPham: string

    @Column({
        type: 'money',
    })
    GiaBan: number

    @Column({
        type: 'nvarchar',
        length: 1000,
        nullable: true
    })
    AnhSanPham: string

    @Column({
        type: 'nvarchar',
        length: 500
    })
    MoTaSanPham: string

    @Column({
        type: 'nvarchar',
        length: 100
    })
    DanhMuc: string
    @Column({
        type: 'int'
    })
    SoLuongSanPham: string
    @Column({
        type: 'nvarchar',
        length: 250
    })
    ThuongHieu: string
    @OneToMany(() => BinhLuanDanhGia, binhLuanDanhGia => binhLuanDanhGia.product)
    binhLuanDanhGia: BinhLuanDanhGia[]

    @OneToMany(() => ChiTietDonHang, chiTietDonHang => chiTietDonHang.product)
    orderDetail: ChiTietDonHang[]

    @OneToMany(() => ChiTietMaGiamGia, chiTietMaGiamGia => chiTietMaGiamGia.product)
    chitietmagiamgia: ChiTietMaGiamGia[]

}
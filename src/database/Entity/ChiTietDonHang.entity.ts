import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, } from "typeorm";
import { DonHang } from "./DonHang.entity";
import { Product } from "./SanPham.entity";

@Entity('ChiTietDonHang')
export class ChiTietDonHang {

    @PrimaryGeneratedColumn('identity')
    chiTietDonHang: number

    @Column({
        type: 'int'
    })
    SoLuongMua: number
    @Column({
        type: 'nvarchar',
        length: 20
    })
    KichThuoc: string
    @Column({
        type: 'nvarchar',
        length: 20
    })
    MauSau: string
    @Column({
        type: 'int'
    })
    MaGiamGia: number

    @Column({
        type: 'int',
        default: 0
    })
    TrangThaiDonHang: number

    @ManyToOne(() => Product, product => product.orderDetail)
    @PrimaryColumn({
        type: 'int'
    })
    product: Product

    @ManyToOne(() => DonHang, donHang => donHang.orderDetail)
    @PrimaryColumn({
        type: 'int'
    })
    donHang: DonHang

}
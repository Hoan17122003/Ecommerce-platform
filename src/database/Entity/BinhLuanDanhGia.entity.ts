import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

import { Product } from "./SanPham.entity";
import { NguoiMuaHang } from "./NguoiMuaHang.entity";

@Entity('BinhLuanDanhGia')
export class BinhLuanDanhGia extends BaseEntity {
    @PrimaryGeneratedColumn('identity')
    MaBinhLLuanDanhGia: number

    @Column({
        type: 'nvarchar',
        length: 20,
        name: 'type'
    })
    Kieu: string

    @Column({
        type: 'nvarchar',
        length: 500,
    })
    NoiDung: string

    @Column({
        type: 'int',
        nullable: true
    })
    ChiSoDanhGia: number

    @ManyToOne(() => Product, product => product.binhLuanDanhGia)
    product: Product

    @ManyToOne(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.binhLuanDanhGia)
    nguoiMuaHang: NguoiMuaHang
}
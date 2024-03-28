import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, BaseEntity } from "typeorm";

import { TaiKhoan } from "./TaiKhoan.entity";
import { Chat } from "./Chat.entity";
import { DonHang } from "./DonHang.entity";
import { ChiTietMaGiamGia } from "./ChiTietMaGiamGia.entity";
import { ViNguoiDung } from "./ViNguoiDung.entity";

@Entity('NguoiBanHang')
export class NguoiBanHang extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    MaNguoiBanHang: number

    @Column({
        type: 'nvarchar',
        length: 50
    })
    HoDem: string;

    @Column({
        type: 'nvarchar',
        length: 50,
    })
    Ten: string

    @Column({
        type: 'nvarchar',
        length: 20,
        unique: true
    })
    SDT: string

    @Column({
        type: 'date'
    })
    NgayThangNamSinh: Date

    @Column({
        type: 'nvarchar',
        length: 250
    })
    DiaChi: string

    taiKhoan: TaiKhoan
    @OneToMany(() => Chat, chat => chat.nguoiBanHang)
    chats: Chat[]

    @OneToMany(() => DonHang, donHang => donHang.nguoiBanHang)
    donHang: DonHang[]

    @OneToMany(() => ChiTietMaGiamGia, chiTietMaGiamGia => chiTietMaGiamGia.nguoiBanHang)
    chiTietMaGiamGia: ChiTietMaGiamGia[]

    @OneToOne(() => ViNguoiDung, viNguoiDung => viNguoiDung.nguoiBanHang)
    @JoinColumn()
    viNguoiDung: ViNguoiDung
}
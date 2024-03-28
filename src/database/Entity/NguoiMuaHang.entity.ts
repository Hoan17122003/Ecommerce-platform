import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TaiKhoan } from "./TaiKhoan.entity";
import { Chat } from "./Chat.entity";
import { DonHang } from "./DonHang.entity";
import { BinhLuanDanhGia } from "./BinhLuanDanhGia.entity";
import { ViNguoiDung } from "./ViNguoiDung.entity";
import { NguoiMuaHangEntity } from "./index.entity";

@Entity('NguoiMuaHang')
export class NguoiMuaHang extends BaseEntity {
    @PrimaryColumn({
        type: 'int',
        // name : 'MaNguoiMuaHang',
        primaryKeyConstraintName : 'MaNguoiMuaHang'
    })
    // @OneToOne(() => TaiKhoan)
    // @JoinColumn()
    MaNguoiMuaHang: number

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

    @OneToMany(() => Chat, chat => chat.nguoiMuaHang)
    chats: Chat[]

    @OneToMany(() => DonHang, donHang => donHang.nguoiMuaHang)
    donHang: DonHang[]

    @OneToMany(() => BinhLuanDanhGia, binhLuanDanhGia => binhLuanDanhGia.nguoiMuaHang)
    binhLuanDanhGia: BinhLuanDanhGia[]

    @OneToOne(() => ViNguoiDung, viNguoiDung => viNguoiDung.nguoiMuaHang)
    viNguoiDung: ViNguoiDung

}
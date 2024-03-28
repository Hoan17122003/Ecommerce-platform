import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NguoiBanHang } from "./NguoiBanHang.entity";
import { NguoiMuaHang } from "./NguoiMuaHang.entity";

@Entity('Chat')
export class Chat {

    @PrimaryGeneratedColumn('identity')
    chatId: number
    @Column({
        type: 'nvarchar',
        length: 1000
    })
    NoiDungChat: string
    @Column({
        type: 'datetime',
        default: Date.now()
    })
    ThoiDiemChat: Date

    @ManyToOne(() => NguoiBanHang, nguoiBanHang => nguoiBanHang.chats)
    nguoiBanHang: NguoiBanHang

    @ManyToOne(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.chats)
    nguoiMuaHang: NguoiMuaHang
}
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { NguoiMuaHang } from './NguoiMuaHang.entity';
import { NguoiBanHang } from './NguoiBanHang.entity';

@Entity('ViNguoiDung')
export class ViNguoiDung {
    @PrimaryGeneratedColumn('identity')
    MaViNguoiDung: number;

    @Column({
        type: 'money',
        default: 0,
    })
    SoDuHienTai: number;

    @Column({
        type: 'nvarchar',
        length: 100,
    })
    TenNganHangLienKet: string;
}

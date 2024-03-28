import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { DonHang } from "./DonHang.entity";

@Entity('ThanhToan')
export class ThanhToan {
    @PrimaryGeneratedColumn('identity')
    MaThanhToan: number

    @Column({
        type: 'nvarchar',
        length: 50,
    })
    HinhThucThanhToan: string

    @Column({
        type: 'bit'
    })
    TrangThaiThanhToan: number

    @CreateDateColumn({
        type: 'datetime',
        name: 'ThoiGianThanhToan',
        default: Date.now()
    })
    ThoiGianThanhToan: Date

    // one to many donhang
    @ManyToOne(() => DonHang, donHang => donHang.thanhToan)
    donHang: DonHang
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ChiTietMaGiamGia } from "./ChiTietMaGiamGia.entity";

@Entity('MaGiamGIa')
export class MaGiamGia {
    @PrimaryGeneratedColumn('identity')
    MaGiamGiaId: number

    @Column({
        type: 'nvarchar',
        length: 50,
        enum: ['Trang Phục , Điện tử, Thực phẩm, Gia Dụng']
    })
    LoaiGiamGia: number
    @Column({
        type: 'datetime',
        default: 'getdate()'
    })
    ThoiGianBatDau: Date
    @Column({
        type: 'datetime'
    })
    ThoiGianKetThuc: Date
    @OneToMany(() => ChiTietMaGiamGia, chiTietMaGiamGia => chiTietMaGiamGia.MaGiamGiaId)
    chitietmagiamgia: ChiTietMaGiamGia[]
}
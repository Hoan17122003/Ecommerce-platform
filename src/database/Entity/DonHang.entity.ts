import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { NguoiBanHang } from './NguoiBanHang.entity'
import { NguoiMuaHang } from './NguoiMuaHang.entity'
import { ChiTietNhaVanChuyen } from './ChiTietNhaVanChuyen.entity'
import { ChiTietDonHang } from './ChiTietDonHang.entity'
import { ThanhToan } from './ThanhToan.entity'


@Entity('DonHang')
export class DonHang {
    @PrimaryGeneratedColumn('identity')
    MaDonHang: number

    @Column({
        type: 'datetime',
        default: 'getdate()'
    })
    ThoiGianLap: Date

    @Column({
        type: 'int',
        default: 0
    })
    TrangThaiDonHang: number

    @ManyToOne(() => NguoiBanHang, nguoiBanHang => nguoiBanHang.donHang)
    nguoiBanHang: NguoiBanHang

    @ManyToOne(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.donHang)
    nguoiMuaHang: NguoiMuaHang

    @OneToMany(() => ChiTietNhaVanChuyen, chiTietNhaVanChuyen => chiTietNhaVanChuyen.donHang)
    chitietnhavanchuyen: ChiTietNhaVanChuyen[]

    @OneToMany(() => ChiTietDonHang, chiTietDonHang => chiTietDonHang.donHang)
    orderDetail: ChiTietDonHang[]

    @OneToMany(() => ThanhToan, thanhToan => thanhToan.donHang)
    thanhToan: ThanhToan[]



}
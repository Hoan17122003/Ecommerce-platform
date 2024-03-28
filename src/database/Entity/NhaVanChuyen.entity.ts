import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ChiTietNhaVanChuyen } from "./ChiTietNhaVanChuyen.entity";

@Entity('NhaVanChuyen')
export class NhaVanChuyen {
    @PrimaryGeneratedColumn('identity')
    MaNhaVanChuyen: number

    @Column({
        type: 'nvarchar',
        length: 50
    })
    TenNhaVanChuyen: string

    @Column({
        type: 'nvarchar',
        length: 20,
        unique: true
    })
    SDT: string

    @OneToMany(() => ChiTietNhaVanChuyen, chiTietNhaVanChuyen => chiTietNhaVanChuyen.nhaVanChuyen)
    chitietnhavanchuyen: ChiTietNhaVanChuyen[]
}
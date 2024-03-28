import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, PrimaryColumn } from "typeorm";
import * as argon2 from 'argon2'
import { TaiKhoanDTO } from "src/account/dto/account.dto";

@Entity('TaiKhoan')
export class TaiKhoan extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    TaiKhoanId: number

    @Column({
        type: 'nvarchar',
        length: 255
    })
    TenDangNhap: string

    @Column({
        length: 50,
    })
    TenTaiKhoan: string

    @Column({
        length: 3000,
    })
    MatKhau: string

    @Column({
        type: 'nvarchar',
        length: 20,
        enum: ['NguoiBanHang', 'NguoiMuaHang']
    })
    VaiTro: string


    @Column({
        type: 'nvarchar',
        length: 1000,
    })
    AnhDaiDien: string

    @Column({
        type: 'varchar',
        length: 100
    })
    Email: string

    // @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true, default : Date.now() })
    // createdAt: Date;

    // @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true , default: Date.now()})
    // updatedAt: Date;

    @Column({
        name: 'isActive',
        type: 'bit',
        default: 1,
    })
    trangThaiTaiKhoan: number

    @OneToMany(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.TaiKhoanId)
    nguoiMuaHang: NguoiMuaHang[]


    @BeforeInsert()
    async hashPassword() {
        const hash = argon2.hash(this.MatKhau, {
            hashLength: 3000,
        })

    }


}
import { NguoiMuaHang } from "./NguoiMuaHang.entity";


import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Relation, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import * as argon from 'argon2'
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
    trangThaiTaiKhoan: number;

    // @OneToOne(() => NguoiMuaHang, nguoiMuaHang => nguoiMuaHang.taiKhoanId)
    // nguoiMuaHang: Relation<NguoiMuaHang>;

    // @OneToOne(() => NguoiBanHang, nguoiBanHang => nguoiBanHang.taiKhoanId)
    // nguoiBanHang: Relation<NguoiBanHang>;


    @BeforeInsert()
    async hashPassword() {
        const MatKhau = await argon.hash(this.MatKhau, {
            hashLength: 200,
        })
        this.MatKhau = MatKhau;
    }

    async verifyPassword(MatKhau: string) {
        return await argon.verify(MatKhau, this.MatKhau);
    }




}
import { NguoiMuaHang } from "./NguoiMuaHang.entity";
import { NguoiBanHang } from "./NguoiBanHang.entity";


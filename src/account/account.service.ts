import { ForbiddenException, Inject, Injectable, Scope, Session, UnauthorizedException } from "@nestjs/common";
import { DataSource, Repository, UnorderedBulkOperation } from "typeorm";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";


import { NguoiMuaHangEntity, TaiKhoanEntity } from "src/database/Entity/index.entity";
import { TaiKhoanDTO } from "./dto/account.dto";
import { BaseService } from "src/database/base.service";

import { TaiKhoanRepository } from "src/database/Repository/TaiKhoan.repository";
import { BuyerDTO } from "src/buyer/dto/buyer.dto";
import { BuyerService } from "src/buyer/buyer.service";
import { VenderService } from "src/vender/vender.service";
import { NguoiBanHangEntity } from "src/database/Entity/index.entity";
// import repository buyer and vender

@Injectable({
    scope: Scope.REQUEST
})
export class AccountService extends BaseService<TaiKhoanEntity, TaiKhoanRepository>  {



    constructor(
        @Inject('ACCOUNT_REPOSITORY') private readonly accountRepository: TaiKhoanRepository,
        @Inject('VENDER') private readonly venderService: VenderService,
        @Inject('BUYER') private readonly buyerService: BuyerService,
        private jwtService: JwtService
    ) {
        super(accountRepository);
    }




    async save(TenTaiKhoan, TenDangNhap, Email, MatKhau, VaiTro, AnhDaiDien, HoDem, Ten, SDT, NgayThangNamSinh, DiaChi): Promise<TaiKhoanEntity | undefined> {
        try {
            console.log('vaitro', VaiTro);
            console.log('TK: ', TenTaiKhoan)
            console.log('TenDangNhap: ', TenDangNhap);
            // console.log('adad: ', this.buyerService.test());
            // console.log(this.buyerService.test())
            console.log('test : ', this.buyerService.test());


            const newTaiKhoan = new TaiKhoanEntity();
            newTaiKhoan.TenTaiKhoan = TenTaiKhoan;
            newTaiKhoan.TenDangNhap = TenDangNhap
            newTaiKhoan.Email = Email;
            newTaiKhoan.MatKhau = MatKhau;
            newTaiKhoan.VaiTro = VaiTro;
            const taikhoan: TaiKhoanEntity = await this.accountRepository.save(newTaiKhoan);

            console.log('IdAccount : ', taikhoan.TaiKhoanId);


            if (VaiTro == 'NguoiMuaHang') {

                const newBuyer = new NguoiMuaHangEntity();
                newBuyer.HoDem = HoDem;
                newBuyer.Ten = Ten;
                newBuyer.SDT = SDT;
                newBuyer.NgayThangNamSinh = NgayThangNamSinh;
                newBuyer.MaNguoiMuaHang = taikhoan.TaiKhoanId;
                await this.buyerService.store(newBuyer);
            }
            if (VaiTro == 'NguoiBanHang') {
                const newVender = new NguoiBanHangEntity();
                newVender.HoDem = HoDem;
                newVender.Ten = Ten;
                newVender.SDT = SDT;
                newVender.NgayThangNamSinh = NgayThangNamSinh;
                newVender.DiaChi = DiaChi;
                // newVender.taikhoan = taikhoan;
                await this.venderService.save(newVender);
            }
            return taikhoan;
        } catch (error) {
            console.log('error : ', error);
            throw new ForbiddenException(error);
            // console.log('error: ', error);
        }
    }

    async profile(id: number): Promise<TaiKhoanEntity | null> {
        try {
            const account = await this.accountRepository.createQueryBuilder()
                .where(`TaiKhoanId = ${id}`)
                .getOne();
            console.log(account)
            return account;
            // return this.accountRepository.findOneId(id);
        } catch (error) {
            throw Error(error);
        }
    }

    async changeInformation(id: number, type: string): Promise<TaiKhoanEntity> {
        try {
            if (type == 'NguoIBanHang') {
                let data = await this.accountRepository.findOneId(id);
                console.log(typeof data);
                return data;
            }
        } catch (error) {

        }
    }
    async findOne(tenDangNhap: string) {
        return this.accountRepository.find({
            select: {
                TaiKhoanId: true,
                TenTaiKhoan: true,
                MatKhau: true
            },
            where: {
                TenDangNhap: tenDangNhap
            }
        })
    }

    async testJWT(session: Record<string, any>) {
        const a = this.jwtService.verify(session.token)
        return a;
    }

    // async findUserName(tenDangNhap: string): Promise<TaiKhoanEntity> {
    //     try {
    //         return this.accountRepository.find({
    //             select: {
    //                 TaiKhoanId: true,
    //                 MatKhau: true
    //             },
    //             where: {
    //                 TenDangNhap: tenDangNhap
    //             }
    //         });
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }

    test() : string {
        return "heehehe"
    }

}
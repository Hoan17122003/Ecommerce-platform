import { ForbiddenException, Inject, Injectable, Scope } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";


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
        // private readonly accountRepository: TaiKhoanRepository,
        @Inject('BUYER') private readonly buyerService: BuyerService,
        @Inject('VENDER') private readonly venderService: VenderService
        // private readonly venderService: VenderService
    ) {
        super(accountRepository);
    }




    async save(TenTaiKhoan, TenDangNhap, Email, MatKhau, VaiTro, AnhDaiDien, HoDem, Ten, SDT, NgayThangNamSinh, DiaChi): Promise<TaiKhoanEntity | undefined> {
        try {
            console.log('vaitro', VaiTro);
            console.log('TK: ', TenTaiKhoan)
            console.log('TenDangNhap: ', TenDangNhap);


            if (VaiTro == 'NguoiMuaHang') {
                const newBuyer = new NguoiMuaHangEntity();
                newBuyer.HoDem = HoDem;
                newBuyer.Ten = Ten;
                newBuyer.SDT = SDT;
                newBuyer.NgayThangNamSinh = NgayThangNamSinh;

            }
            if (VaiTro == 'NguoiBanHang') {
                const newVender = new NguoiBanHangEntity();
                newVender.HoDem = HoDem;
                newVender.Ten = Ten;
                newVender.SDT = SDT;
                newVender.NgayThangNamSinh = NgayThangNamSinh;
                newVender.DiaChi = DiaChi;
                await this.venderService.save(newVender);
            }
            const newTaiKhoan = new TaiKhoanEntity();
            newTaiKhoan.TenTaiKhoan = TenTaiKhoan;
            newTaiKhoan.TenDangNhap = TenDangNhap
            newTaiKhoan.Email = Email;
            newTaiKhoan.MatKhau = MatKhau;
            newTaiKhoan.VaiTro = VaiTro;
            return this.accountRepository.save(newTaiKhoan, {
                reload: true,
            });
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
                let data = await this.findById(id);
                console.log(typeof data);
                return data;
            }
        } catch (error) {

        }
    }

}
import {
    ForbiddenException,
    Inject,
    Injectable,
    Scope,
    Session,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { DataSource, Repository, UnorderedBulkOperation } from 'typeorm';
import * as argon from 'argon2';

import { NguoiMuaHangEntity, TaiKhoanEntity } from 'src/database/Entity/index.entity';
import { TaiKhoanDTO } from './dto/account.dto';
import { BaseService } from 'src/database/base.service';

import { TaiKhoanRepository } from 'src/database/Repository/TaiKhoan.repository';
import { BuyerDTO } from 'src/buyer/dto/buyer.dto';
import { BuyerService } from 'src/buyer/buyer.service';
import { VenderService } from 'src/vender/vender.service';
import { NguoiBanHangEntity } from 'src/database/Entity/index.entity';
import { VenderDTO } from 'src/vender/dto/vender.dto';
import { JwtAccessTokenGuard } from 'src/auth/guard/JwtAuth.guard';
import { getProfile, findInformation } from 'src/database/Repository/TaiKhoan.repository';
// import repository buyer and vender

@Injectable({
    scope: Scope.REQUEST,
})
export class AccountService extends BaseService<TaiKhoanEntity, TaiKhoanRepository> {
    constructor(
        @Inject('ACCOUNT_REPOSITORY') private readonly accountRepository: TaiKhoanRepository,
        @Inject('VENDER') private readonly venderService: VenderService,
        @Inject('BUYER') private readonly buyerService: BuyerService,
    ) {
        super(accountRepository);
    }

    async save(
        taikhoan: TaiKhoanDTO,
        HoDem: string,
        Ten: string,
        SDT: string,
        NgayThangNamSinh: Date,
        DiaChi?: string,
    ): Promise<TaiKhoanEntity | undefined> {
        try {

            if (await findInformation(taikhoan.TenDangNhap, taikhoan.Email, SDT, taikhoan.VaiTro))
                throw new UnauthorizedException();

            const newTaiKhoan = new TaiKhoanEntity();
            newTaiKhoan.TenTaiKhoan = taikhoan.TenTaiKhoan;
            newTaiKhoan.TenDangNhap = taikhoan.TenDangNhap;
            newTaiKhoan.Email = taikhoan.Email;
            newTaiKhoan.MatKhau = taikhoan.MatKhau;
            newTaiKhoan.VaiTro = taikhoan.VaiTro;
            const taiKhoan: TaiKhoanEntity = await this.accountRepository.save(newTaiKhoan);

            if (taikhoan.VaiTro == 'NguoiMuaHang') {
                const nguoiMuaHang: BuyerDTO = {
                    Ten,
                    HoDem,
                    SDT,
                    NgayThangNamSinh,
                };
                await this.buyerService.create(nguoiMuaHang, taiKhoan);
            } else if (taikhoan.VaiTro == 'NguoiBanHang') {
                const nguoiBanHang: VenderDTO = {
                    HoDem,
                    Ten,
                    SDT,
                    NgayThangNamSinh,
                    DiaChi,
                };
                await this.venderService.create(nguoiBanHang, taiKhoan);
            }
            return taiKhoan;
        } catch (error) {
            console.log('error : ', error);
            throw new ForbiddenException(error);
            // console.log('error: ', error);
        }
    }

    async profile(id: number, vaitro: string): Promise<TaiKhoanEntity | null> {
        try {
            const account = await getProfile(id, vaitro);
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
        } catch (error) {}
    }
    async find(tenDangNhap: string) {
        return this.accountRepository.findOne({
            select: {
                TaiKhoanId: true,
                TenTaiKhoan: true,
                MatKhau: true,
            },
            where: {
                TenDangNhap: tenDangNhap,
            },
        });
    }

    async findById(TaiKhoanId: number): Promise<TaiKhoanEntity> {
        const user = await this.accountRepository.findOne({
            select: {
                TaiKhoanId: true,
            },
            where: {
                TaiKhoanId: TaiKhoanId,
            },
        });
        return user;
    }
}

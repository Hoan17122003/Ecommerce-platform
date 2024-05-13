import {
    ForbiddenException,
    Inject,
    Injectable,
    Scope,
    Session,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';

import { NguoiMuaHangEntity, TaiKhoanEntity } from 'src/database/Entity/index.entity';
import { TaiKhoanDTO } from './dto/account.dto';
import { BaseService } from 'src/database/base.service';

import { TaiKhoanRepository } from 'src/database/Repository/TaiKhoan.repository';
import { BuyerDTO } from 'src/buyer/dto/buyer.dto';
import { BuyerService } from 'src/buyer/buyer.service';
import { VenderService } from 'src/vender/vender.service';
import { VenderDTO } from 'src/vender/dto/vender.dto';
import { getProfile, findInformation, setRefreshToken } from 'src/database/Repository/TaiKhoan.repository';
import { UserDTO } from './dto/user.dto';
import { DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS } from 'google-auth-library/build/src/auth/authclient';
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

    async save(taikhoan: TaiKhoanDTO, user: UserDTO): Promise<TaiKhoanEntity> {
        try {
            // if (await findInformation(taikhoan.TenDangNhap, taikhoan.Email, SDT, taikhoan.VaiTro))
            //     throw new UnauthorizedException();
            const data = await findInformation(taikhoan.TenDangNhap, taikhoan.Email, user.SDT, taikhoan.VaiTro);
            if (!data) throw new UnauthorizedException();
            const newTaiKhoan = new TaiKhoanEntity();
            newTaiKhoan.TenTaiKhoan = taikhoan.TenTaiKhoan;
            newTaiKhoan.TenDangNhap = taikhoan.TenDangNhap;
            newTaiKhoan.Email = taikhoan.Email;
            newTaiKhoan.MatKhau = taikhoan.MatKhau;
            newTaiKhoan.VaiTro = taikhoan.VaiTro;
            const taiKhoan: TaiKhoanEntity = await this.accountRepository.save(newTaiKhoan);

            if (taikhoan.VaiTro == 'NguoiMuaHang') {
                const nguoiMuaHang: BuyerDTO = {
                    Ten: user.Ten,
                    HoDem: user.HoDem,
                    SDT: user.SDT,
                    NgayThangNamSinh: user.NgayThangNamSinh,
                };
                await this.buyerService.create(nguoiMuaHang, taiKhoan);
            } else if (taikhoan.VaiTro == 'NguoiBanHang') {
                const nguoiBanHang: VenderDTO = {
                    HoDem: user.HoDem,
                    Ten: user.Ten,
                    SDT: user.SDT,
                    NgayThangNamSinh: user.NgayThangNamSinh,
                    DiaChi: user.DiaChi,
                };
                await this.venderService.create(nguoiBanHang, taiKhoan);
            }
            return taiKhoan;
        } catch (error) {
            throw new UnauthorizedException(error);
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

    async changeInformation(
        id: number,
        type: string,
        data: { TenTaiKhoan?: string; SDT?: string; DiaChi?: string; AnhDaiDien?: string },
    ): Promise<TaiKhoanEntity | number> {
        try {
            if (type === 'NguoiBanHang') {
                await this.venderService.changeInformation(id, { SDT: data.SDT, DiaChi: data.DiaChi });
            } else if (type === 'NguoiMuaHang') await this.buyerService.changeInformation(id, data.SDT);
            await this.accountRepository.update(id, { AnhDaiDien: data.AnhDaiDien, TenTaiKhoan: data.TenTaiKhoan });
            return id;
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
                VaiTro: true,
            },
            where: {
                TaiKhoanId: TaiKhoanId,
            },
        });
        return user;
    }

    async setRefreshToken(refreshToken: string, id: number) {
        await setRefreshToken(refreshToken, id);
        return;
    }

    async findRefreshToken(refreshToken: string, taiKhoanId: number): Promise<boolean> {
        const isRefreshToken = await this.accountRepository.findOne({
            select: {
                refreshToken: true,
            },
            where: {
                TaiKhoanId: taiKhoanId,
                refreshToken: refreshToken,
            },
        });
        return isRefreshToken ? true : false;
    }

    async deleteAccount(id: number, vaitro: string): Promise<string> {
        if (vaitro === 'NguoiBanHang') await this.venderService.delete(id);
        else if (vaitro === 'NguoiMuaHang') await this.venderService.delete(id);
        return 'xoá thành công';
    }
}

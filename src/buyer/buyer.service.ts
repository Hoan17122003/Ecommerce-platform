import { Injectable, Inject, Global, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseService } from 'src/database/base.service';
import { NguoiMuaHangEntity, TaiKhoanEntity } from 'src/database/Entity/index.entity';
import { NguoiMuaHangRepository } from 'src/database/Repository/NguoiMuaHang.repository';
import { BuyerDTO } from './dto/buyer.dto';

@Injectable({})
export class BuyerService extends BaseService<NguoiMuaHangEntity, NguoiMuaHangRepository> {
    constructor(@Inject('BUYER_REPOSITORY') readonly repository: NguoiMuaHangRepository) {
        super(repository);
    }

    async create(nguoiMuaHang: BuyerDTO, taiKhoan: TaiKhoanEntity) {
        const nguoiMuaHangEntity: NguoiMuaHangEntity = new NguoiMuaHangEntity();
        nguoiMuaHangEntity.HoDem = nguoiMuaHang.HoDem;
        nguoiMuaHangEntity.Ten = nguoiMuaHang.Ten;
        nguoiMuaHangEntity.SDT = nguoiMuaHang.SDT;
        nguoiMuaHangEntity.NgayThangNamSinh = nguoiMuaHang.NgayThangNamSinh;
        nguoiMuaHangEntity.MaNguoiMuaHang = taiKhoan.TaiKhoanId;
        nguoiMuaHangEntity.viNguoiDung = null;
        nguoiMuaHangEntity.binhLuanDanhGia = null;
        nguoiMuaHangEntity.chats = null;
        nguoiMuaHangEntity.donHang = null;
        return this.repository.save(nguoiMuaHangEntity);
    }

    async changeInformation(id: number, SDT: string) {
        return await this.repository.update(id, { SDT });
    }

    test() {
        return 'hehehe';
    }
}

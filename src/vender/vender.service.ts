import { Injectable, Inject, Global } from '@nestjs/common';
import { NguoiBanHangEntity } from 'src/database/Entity/index.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/database/base.service';
import { NguoiBanHangRepository } from 'src/database/Repository/NguoiBanHang.repository';
import { VenderDTO } from './dto/vender.dto';

@Global()
@Injectable({})
export class VenderService extends BaseService<NguoiBanHangEntity, NguoiBanHangRepository> {
    constructor(@Inject('NGUOIBANHANG_REPOSITORY') private readonly nguoiBanHangRepository?: NguoiBanHangRepository) {
        super(nguoiBanHangRepository);
    }

    // constructor(repository: NguoiBanHangRepository) {
    //     super(repository)
    // }

    async create(nguoiBanHang: VenderDTO, taiKhoanId: number): Promise<NguoiBanHangEntity> {
        const nguoiBanHangEntity: NguoiBanHangEntity = new NguoiBanHangEntity();
        nguoiBanHangEntity.Ten = nguoiBanHang.Ten;
        nguoiBanHangEntity.HoDem = nguoiBanHang.HoDem;
        nguoiBanHangEntity.DiaChi = nguoiBanHang.DiaChi;
        nguoiBanHangEntity.SDT = nguoiBanHang.SDT;
        nguoiBanHangEntity.NgayThangNamSinh = nguoiBanHang.NgayThangNamSinh;
        nguoiBanHangEntity.MaNguoiBanHang = taiKhoanId;

        return this.nguoiBanHangRepository.save(nguoiBanHangEntity, {
            reload: true,
        });
    }

    getRepository() {
        return this.nguoiBanHangRepository;
    }
}

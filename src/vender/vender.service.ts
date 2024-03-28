import { Injectable, Inject, Global } from "@nestjs/common";
import { NguoiBanHangEntity } from "src/database/Entity/index.entity";
import { Repository } from "typeorm";
import { BaseService } from "src/database/base.service";
import { NguoiBanHangRepository } from "src/database/Repository/NguoiBanHang.repository";

@Global()
@Injectable({})
export class VenderService extends BaseService<NguoiBanHangEntity, NguoiBanHangRepository> {

    constructor(@Inject('NGUOIBANHANG_REPOSITORY') private readonly nguoiBanHangRepository: NguoiBanHangRepository) {
        super(nguoiBanHangRepository)
    }

    // constructor(repository: NguoiBanHangRepository) {
    //     super(repository)
    // }

    async save(data: NguoiBanHangEntity): Promise<NguoiBanHangEntity> {
        return this.nguoiBanHangRepository.save(data, {
            reload: true
        });
    }

    getRepository() {
        return this.nguoiBanHangRepository;
    }




}
import { Injectable, Inject, Global, Scope } from "@nestjs/common";
import { Repository } from "typeorm";


import { BaseService } from "src/database/base.service";
import { NguoiMuaHangEntity } from "src/database/Entity/index.entity";
import { NguoiMuaHangRepository } from "src/database/Repository/NguoiMuaHang.repository";


@Global()
@Injectable({})
export class BuyerService extends BaseService<NguoiMuaHangEntity, NguoiMuaHangRepository> {


    constructor(@Inject('BUYER_REPOSITORY') readonly repository: NguoiMuaHangRepository) {
        super(repository)
    }

    async save(data: NguoiMuaHangEntity): Promise<NguoiMuaHangEntity | null> {
        try {
            return this.repository.save(data, {
                reload: true
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    test(): string {
        return 'test';
    }


}
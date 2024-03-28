import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TaiKhoanDTO } from '../account/dto/account.dto'

import { NguoiBanHangEntity, NguoiMuaHangEntity, TaiKhoanEntity } from '../database/Entity/index.entity'
import { BaseService } from "src/database/base.service";
import { AccountService } from "src/account/account.service";

@Injectable()
export class AuthService {
    constructor(private readonly accountService: AccountService) {

    }


    async SignUpWithFaceBook() {

    }
    async SignUpWithGoogle() {

    }







}
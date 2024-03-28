import { EntityRepository, Repository } from 'typeorm'

import { NguoiMuaHangEntity } from '../Entity/index.entity'
import { EntityId } from 'typeorm/repository/EntityId'

@EntityRepository(NguoiMuaHangEntity)
export class NguoiMuaHangRepository extends Repository<NguoiMuaHangEntity> {

    // async store(HoDem: string, Ten: string, SDT: string, NgayThangNamSinh: Date) {
    //     try {
    //         return await this
    //             .createQueryBuilder()
    //             .insert()
    //             .into(NguoiMuaHangEntity)
    //             .values([{
    //                 HoDem: HoDem,
    //                 Ten: Ten,
    //                 SDT: SDT,
    //                 NgayThangNamSinh: NgayThangNamSinh

    //             }])
    //             .execute();


    //     } catch (error) {
    //         console.log('error : ', error);
    //         return null;

    //     }
    // }



}
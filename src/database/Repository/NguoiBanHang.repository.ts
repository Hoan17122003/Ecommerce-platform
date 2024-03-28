import { EntityRepository, Repository, getRepository } from 'typeorm'
import { EntityId } from 'typeorm/repository/EntityId'

import { NguoiBanHangEntity } from '../Entity/index.entity'
import { dataSource } from '../database.providers'


export const NguoiBanHangRepository = dataSource.getRepository(NguoiBanHangEntity).extends({
    // getAllCommentForProduct(idProduct: number) {
    //     return this.createQueryBuilder()
    //         .select("NoiDung", "")
    //         // .leftJoinAndSelect('BinhLuanDanhGia.MaNguoiMuaHang',)
    //         .where(`type = BinhLuan and MaSanPham = ${idProduct}`)
    //         .getMany()
    // }

    // profile(id: EntityId): Promise<NguoiBanHangEntity> {
    //     return this.createQueryBuilder()
    //         .select('TaiKhoan.TenTaiKhoan', 'AnhDaiDien')
    //         .leftJoinAndSelect('NguoiBanHang.TaiKhoanId', 'TaiKhoan')
    //         .where('TaiKhoanId = :TaiKhoanId', {
    //             TaiKhoanId: id
    //         })
    //         .getOne()
    // }



})
import { DataSource, Repository, getRepository } from 'typeorm'
import { BinhLuanDanhGiEntity } from '../Entity/index.entity'
import { dataSource } from '../database.providers'


export const BinhLuanDanhGiaRepository = dataSource.getRepository(BinhLuanDanhGiEntity).extends({
    getAllCommentForProduct(idProduct: number) {
        return this.createQueryBuilder()
            .select("NoiDung", "")
            // .leftJoinAndSelect('BinhLuanDanhGia.MaNguoiMuaHang',)
            .where(`type = BinhLuan and MaSanPham = ${idProduct}`)
            .getMany()
    }

})
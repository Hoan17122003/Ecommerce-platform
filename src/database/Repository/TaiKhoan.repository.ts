import { Entity, EntityRepository, Repository } from "typeorm";
import { TaiKhoanEntity } from "../Entity/index.entity";
import { EntityId } from "typeorm/repository/EntityId";

@EntityRepository(TaiKhoanEntity)
export class TaiKhoanRepository extends Repository<TaiKhoanEntity> {

    // blockedAccount(id: EntityId) {
    //     return this.createQueryBuilder()
    //         .update()
    //         .set({
    //             TrangThaiTaiKhoan: 0
    //         })
    //         .where('TaiKhoanId = :TaiKhoanId', {
    //             TaiKhoanId: id
    //         })
    //         .execute()
    // }


    

    async findOneId(id: EntityId): Promise<TaiKhoanEntity | null> {
        try {
            return await this.createQueryBuilder('TaiKhoan')
                .where('TaiKhoanId = :id', {
                    id: id
                })
                .getOne();

        } catch (error) {
            console.log(error);
            return null;
        }
    }


}

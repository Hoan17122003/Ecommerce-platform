import { Entity, EntityRepository, JoinColumn, Repository } from 'typeorm';
import { TaiKhoanEntity } from '../Entity/index.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import { dataSource } from '../database.providers';
import { unknowProviders } from 'src/middleware/dynamic-providers.providers';

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

    public async findOneId(id: EntityId): Promise<TaiKhoanEntity | null> {
        try {
            return await this.createQueryBuilder('TaiKhoan')
                .select('TenTaiKhoan', 'Email')
                .where('TaiKhoanId = :id', {
                    id: id,
                })
                .getOne();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getProfile(id: number): Promise<TaiKhoanEntity | undefined> {
        try {
            const account = await this.createQueryBuilder().where(`TaiKhoanId = ${id}`).getOne();
            return account;
        } catch (error) {
            throw Error(error);
        }
    }
}

export const getProfile = async (id: number, vaitro: string): Promise<TaiKhoanEntity | undefined> => {
    const accountRepository = dataSource.getRepository(TaiKhoanEntity);
    console.log('vaitro : ', vaitro);
    if (vaitro == 'NguoiMuaHang') {
        return await accountRepository.query(`select * from [dbo].account_getProfile_NguoiMuaHang(${id})`);
    } else if (vaitro == 'NguoiBanHang') {
        return await accountRepository.query(`select * from [dbo].account_getProfile_NguoiBanHang(${id})`);
    }
    // const data = await accountRepository
    //     .createQueryBuilder('account')
    //     .leftJoinAndSelect(`account.${vaitro}`, vaitro)
    //     .where('TaiKhoanId = :id', {
    //         id,
    //     })
    //     .getOne();

    // const data: TaiKhoanEntity = await accountRepository.findOne({
    //     select: {
    //         Email: true,
    //         TenTaiKhoan: true,
    //     },
    //     relations: {
    //         // [vaitro]: true,
    //         nguoiBanHang: true,
    //     },
    //     where: {
    //         TaiKhoanId: id,
    //     },
    //     orderBy: {
    //         TenTaiKhoan: 'DESC',
    //     },
    // });
};

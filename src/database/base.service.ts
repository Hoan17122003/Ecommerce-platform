import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { IbaseService } from './i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IbaseService<T> {
    protected readonly repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    index(): Promise<T[]> {
        return this.repository.find();
    }

    findById(id: EntityId): Promise<T> {
        return this.repository.findOneById(id);
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findByIds(ids);
    }

    

    async store(data: any): Promise<T | undefined> {
        return this.repository.save(data);
    }

    async update(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data);
        return this.repository.findOneById(id);
    }

    delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}

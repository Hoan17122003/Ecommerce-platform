import { DataSource } from "typeorm"



const unknowProviders = (NameProvider: string, Entity: any) => ({
    provide: NameProvider,
    useFactory: (datasource: DataSource) => datasource.getRepository(Entity)
    , inject: ['DATA_SOURCE']
})

export {
    unknowProviders
}
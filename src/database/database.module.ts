import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
// import * as Entity from './Entity/index.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as entities from './Entity/index.entity'

@Global()
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
// @Global()
// @Module({
//     imports: [TypeOrmModule.forRoot({
//         type: 'mssql',
//         host: 'localhost', // Thay đổi thành địa chỉ MSSQL của bạn
//         port: 1433, // Cổng MSSQL mặc định thường là 1433
//         username: process.env.USERNAME || 'sa',
//         password: process.env.PASSWORD || '123',
//         database: process.env.DATABASE || 'TESTDB',
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Thêm mọi entity bạn muốn sử dụng
//         options: {
//             // Tùy chọn này để tin tưởng vào chứng chỉ tự ký
//             trustServerCertificate: true,
//             encrypt: true, // Sử dụng SSL/TLS
//         }
//     })]
// })
export class DatabaseModule {}

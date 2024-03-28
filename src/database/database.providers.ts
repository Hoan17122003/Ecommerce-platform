import { DataSource } from 'typeorm';

let dataSource = null;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: process.env.PASSWORD || '123',
        database: process.env.DATABASE || 'TESTDB',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, // đồng bộ hóa entity với các table trong csdl
        options: {
          // Tùy chọn này để tin tưởng vào chứng chỉ tự ký
          trustServerCertificate: true,
          // encrypt: true, // Sử dụng SSL/TLS
        },
      });

      return dataSource.initialize();
    },
  },
];

export {
  dataSource
}
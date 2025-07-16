import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export default new DataSource({
  type: 'mysql',
  host: process.env.PRINCIPAL_DB_HOST,
  port: parseInt(process.env.PRINCIPAL_DB_PORT || '3306'),
  username: process.env.PRINCIPAL_DB_USER,
  password: process.env.PRINCIPAL_DB_PASSWORD,
  database: process.env.PRINCIPAL_DB_NAME,
  synchronize: false,
  entities: [__dirname + '/entities/**/*.ts'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  logging: false,
});

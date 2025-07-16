import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export default new DataSource({
  type: 'mysql',
  host: process.env.SECONDARY_DB_HOST,
  port: parseInt(process.env.SECONDARY_DB_PORT || '3307'),
  username: process.env.SECONDARY_DB_USER,
  password: process.env.SECONDARY_DB_PASSWORD,
  database: process.env.SECONDARY_DB_NAME,
  entities: [__dirname + '/entities/**/*.ts'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
});

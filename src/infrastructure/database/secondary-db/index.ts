import { DataSource } from 'typeorm';
import AppDataSource from './data-source';
let db: DataSource;
export const initDb = async (): Promise<DataSource> => {
  if (db) return db;
  db = AppDataSource;
  return db.initialize();
};

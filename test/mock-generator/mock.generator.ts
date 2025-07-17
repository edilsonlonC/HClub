import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { initDb } from '../../src/infrastructure/database/principal-db';

export const mockGenerator = async <T extends ObjectLiteral>(data: T): Promise<T> => {
  const dataSource: DataSource = await initDb();
  const repository: Repository<T> = dataSource.getRepository(data.constructor);
  return repository.save(data);
};

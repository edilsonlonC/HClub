import { DataSource } from 'typeorm';
import { initDb as initDbPrincipal } from './src/infrastructure/database/principal-db';
import { initDb as initDbSecondary } from './src/infrastructure/database/secondary-db';
beforeAll(async () => {
  try {
    const dataSourcePrincipal: DataSource = await initDbPrincipal();
    const dataSourceSecondary: DataSource = await initDbSecondary();
    await dataSourcePrincipal.runMigrations();
    await dataSourceSecondary.runMigrations();
  } catch (e) {
    console.log(e);
  }
});

afterAll(async () => {
  try {
    const dataSourcePrincipal: DataSource = await initDbPrincipal();
    const dataSourceSecondary: DataSource = await initDbSecondary();
    const entitiesPrincipal = dataSourcePrincipal.entityMetadatas;
    const entitiesSecondary = dataSourceSecondary.entityMetadatas;
    for (const entityprincipal of entitiesPrincipal) {
      const repository = dataSourcePrincipal.getRepository(entityprincipal.name);
      await repository.query('SET FOREIGN_KEY_CHECKS = 0');
      await repository.query(`TRUNCATE TABLE ${entityprincipal.tableName}`);
      await repository.query('SET FOREIGN_KEY_CHECKS = 1');
    }
    for (const entitySecondary of entitiesSecondary) {
      const repository = dataSourceSecondary.getRepository(entitySecondary.name);
      await repository.query('SET FOREIGN_KEY_CHECKS = 0');
      await repository.query(`TRUNCATE TABLE ${entitySecondary.tableName}`);
      await repository.query('SET FOREIGN_KEY_CHECKS = 1');
    }

    jest.clearAllMocks();
    dataSourcePrincipal.destroy();
    dataSourceSecondary.destroy();
  } catch (e) {
    console.log(e);
  }
});

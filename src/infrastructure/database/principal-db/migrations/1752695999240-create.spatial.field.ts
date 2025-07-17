import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpatialField1752695999240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE apartment
      ADD COLUMN  location POINT NOT NULL SRID 4326
    `);

    await queryRunner.query(`
      CREATE SPATIAL INDEX IDX_apartment_location ON apartment (location)
    `);

    await queryRunner.query(`
      UPDATE apartment
      SET location = ST_SRID(Point(longitude, latitude), 4326)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE apartment DROP INDEX IDX_apartment_location
    `);
    await queryRunner.query(`
      ALTER TABLE apartment DROP COLUMN location
    `);
  }
}

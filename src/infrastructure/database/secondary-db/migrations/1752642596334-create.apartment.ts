import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApartment1752642596334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE property_metadata (
        property_id CHAR(36) PRIMARY KEY,
        description TEXT NOT NULL,
        image_url VARCHAR(2048) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE property_metadata;`);
  }
}

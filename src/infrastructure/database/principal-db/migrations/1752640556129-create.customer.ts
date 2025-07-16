import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomer1752640556129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE customer (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE customer;`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRate1752640635547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE rate (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        apartment_id VARCHAR(36) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        rate_type ENUM('monthly', 'daily') NOT NULL,
        FOREIGN KEY (apartment_id) REFERENCES apartment(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE rate;`);
  }
}

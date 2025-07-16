import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservation1752640881174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE reservation (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        code VARCHAR(255) NOT NULL UNIQUE,
        apartment_id VARCHAR(36) NOT NULL,
        customer_id VARCHAR(36) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status ENUM('active', 'cancelled') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (apartment_id) REFERENCES apartment(id) ON DELETE RESTRICT,
        FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE RESTRICT
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE reservation;`);
  }
}

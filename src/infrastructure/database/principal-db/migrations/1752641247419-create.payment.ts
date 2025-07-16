import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePayment1752641247419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE payment (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        reservation_id CHAR(36) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        method VARCHAR(50) NOT NULL,
        reference VARCHAR(100),
        FOREIGN KEY (reservation_id) REFERENCES reservation(id) ON DELETE RESTRICT
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE payment;`);
  }
}

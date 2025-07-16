import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.payments, { onDelete: 'RESTRICT' })
  reservation: Reservation;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  payment_date: Date;

  @Column()
  method: string;

  @Column({ nullable: true })
  reference: string;
}

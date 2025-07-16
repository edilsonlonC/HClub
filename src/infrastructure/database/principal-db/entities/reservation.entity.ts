import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Apartment } from './apartment.entity';
import { Customer } from './customer.entity';
import { Payment } from './payment.entity';

export enum ReservationStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.reservations, { onDelete: 'RESTRICT' })
  apartment: Apartment;

  @ManyToOne(() => Customer, (customer) => customer.reservations, { onDelete: 'RESTRICT' })
  customer: Customer;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'enum', enum: ReservationStatus })
  status: ReservationStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Payment, (payment) => payment.reservation)
  payments: Payment[];
}

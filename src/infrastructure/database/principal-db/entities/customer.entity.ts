import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];
}

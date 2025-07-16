import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Apartment } from './apartment.entity';

export enum RateType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
}

@Entity()
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.rates, { onDelete: 'CASCADE' })
  apartment: Apartment;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: RateType })
  rate_type: RateType;
}

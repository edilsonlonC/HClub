import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'apartment_id' })
  apartment: Apartment;

  @Column({ name: 'apartment_id' })
  apartmentId: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: string;

  @Column({ type: 'date', name: 'end_date' })
  endDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: RateType, name: 'rate_type' })
  rateType: RateType;

  constructor(startDate: string, endDate: string, price: number, rateType: RateType, apartmentId: string) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.rateType = rateType;
    this.apartmentId = apartmentId;
  }
}

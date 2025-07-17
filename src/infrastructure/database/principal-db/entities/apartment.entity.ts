import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Point } from 'typeorm';
import { Rate } from './rate.entity';
import { Reservation } from './reservation.entity';

export enum ApartmentType {
  CORPORATE = 'corporate',
  TOURISTIC = 'touristic',
}

export enum ApartmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  address: string;

  @Column({ type: 'enum', enum: ApartmentType })
  type: ApartmentType;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column({ type: 'enum', enum: ApartmentStatus })
  status: ApartmentStatus;
  @Column({
    type: 'point',
    spatialFeatureType: 'POINT',
    srid: 4326,
  })
  location: string;

  @OneToMany(() => Rate, (rate) => rate.apartment)
  rates: Rate[];

  @OneToMany(() => Reservation, (reservation) => reservation.apartment)
  reservations: Reservation[];

  @Column({ select: false })
  distance?: number;

  constructor(
    name: string,
    address: string,
    type: ApartmentType,
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    status: ApartmentStatus,
  ) {
    this.name = name;
    this.address = address;
    this.type = type;
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.status = status;
  }
}

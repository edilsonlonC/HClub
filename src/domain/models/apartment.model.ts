export enum ApartmentType {
  CORPORATE = 'corporate',
  TOURISTIC = 'touristic',
}
export enum ApartmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class Apartment {
  constructor(
    private name: string,
    private address: string,
    private type: ApartmentType,
    private city: string,
    private country: string,
    private latitude: number,
    private longitude: number,
    private status: ApartmentStatus,
    private id?: string,
  ) {}
  getId(): string | undefined {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getAddress(): string {
    return this.address;
  }
  getType(): ApartmentType {
    return this.type;
  }
  getCity(): string {
    return this.city;
  }
  getCountry(): string {
    return this.country;
  }
  getLatitude(): number {
    return this.latitude;
  }
  getLongitude(): number {
    return this.longitude;
  }
  getStatus(): ApartmentStatus {
    return this.status;
  }
}

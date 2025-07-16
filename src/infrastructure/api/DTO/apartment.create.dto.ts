enum ApartmentTypeDTO {
  CORPORATE = 'corporate',
  TOURISTIC = 'touristic',
}
enum ApartmentStatusDTO {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class ApartmentCreateDTO {
  constructor(
    private name: string,
    private address: string,
    private type: ApartmentTypeDTO,
    private city: string,
    private country: string,
    private latitude: number,
    private longitude: number,
    private status: ApartmentStatusDTO,
  ) {}
  getName(): string {
    return this.name;
  }
  getAddress(): string {
    return this.address;
  }
  getType(): ApartmentTypeDTO {
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
  getStatus(): ApartmentStatusDTO {
    return this.status;
  }
}

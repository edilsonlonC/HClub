import { RateResponseDto } from './rate.response.dto';

export class ApartmentResponseDTO {
  constructor(
    private id: string,
    private name: string,
    private address: string,
    private type: string,
    private city: string,
    private country: string,
    private latitude: number,
    private longitude: number,
    private status: string,
    private distance?: number,
    private rates?: RateResponseDto[],
    private description?: string,
    private imageUrl?: string,
  ) {}
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getAddress(): string {
    return this.address;
  }
  getType(): string {
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
  getStatus(): string {
    return this.status;
  }
  getDistance(): number | undefined {
    return this.distance;
  }
  getRates(): RateResponseDto[] | undefined {
    return this.rates;
  }
  getDescription(): string | undefined {
    return this.description;
  }
  getImageUrl(): string | undefined {
    return this.imageUrl;
  }
}

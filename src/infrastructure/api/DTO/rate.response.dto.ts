export class RateResponseDto {
  constructor(
    private id: string,
    private startDate: string,
    private endDate: string,
    private price: number,
    private rateType: string,
    private apartmentId: string,
  ) {}
  getId(): string {
    return this.id;
  }
  getStartDate(): string {
    return this.startDate;
  }
  getEndDate(): string {
    return this.endDate;
  }
  getPrice(): number {
    return this.price;
  }
  getRateType(): string {
    return this.rateType;
  }
  getApartmentId(): string {
    return this.apartmentId;
  }
}

enum RateTypeDTO {
  MONTHLY = 'monthly',
  DAILY = 'daily',
}

export class RateCreateDto {
  constructor(
    private startDate: string,
    private endDate: string,
    private price: number,
    private apartmentId: string,
  ) {}
  getStartDate(): string {
    return this.startDate;
  }
  getEndDate(): string {
    return this.endDate;
  }
  getPrice(): number {
    return this.price;
  }
  getApartmentId(): string {
    return this.apartmentId;
  }
}

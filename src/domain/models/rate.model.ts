export enum RateType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
}

export class Rate {
  constructor(
    private startDate: string,
    private endDate: string,
    private price: number,
    private apartmentId: string,
    private id?: string,
    private rateType?: RateType,
  ) {}

  getId(): string | undefined {
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
  getRateType(): RateType | undefined {
    return this.rateType;
  }
  getApartmentId(): string {
    return this.apartmentId;
  }
  setType(rateType: RateType) {
    this.rateType = rateType;
  }
}

import { Logger } from 'pino';
import { NotFoundEntityError } from '../domain/errors/not.found.entity.error';
import { Apartment as ApartmentModel, ApartmentType } from '../domain/models/apartment.model';
import { Rate as RateModel, RateType } from '../domain/models/rate.model';
import { RateRepository } from '../domain/repository/rate.repository';
import { ApartmentUseCase } from './apartment.use.case';
import { createLogger } from '../infrastructure/logger';

export class RateUseCase {
  private readonly logger: Logger = createLogger();
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly apartmentUseCase: ApartmentUseCase,
  ) {}
  async createRate(rate: RateModel): Promise<RateModel> {
    const apartmentExists: ApartmentModel | null = await this.apartmentUseCase.findById(rate.getApartmentId());
    if (!apartmentExists) {
      this.logger.error('Apartment not found');
      throw new NotFoundEntityError('Apartment not found');
    }

    const rateType: RateType =
      apartmentExists.getType() === ApartmentType.CORPORATE ? RateType.MONTHLY : RateType.DAILY;
    rate.setType(rateType);
    return this.rateRepository.create(rate);
  }
}

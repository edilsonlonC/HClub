import { DataSource, Repository } from 'typeorm';
import { Rate as RateModel } from '../../domain/models/rate.model';
import { RateRepository } from '../../domain/repository/rate.repository';
import { Rate as RateEntity } from '../database/principal-db/entities/rate.entity';
import { RateMapper } from '../mapper/rate.mapper';

export class RateRepositoryImpl implements RateRepository {
  private rateRepository: Repository<RateEntity>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly ratemapper: RateMapper,
  ) {
    this.rateRepository = this.dataSource.getRepository(RateEntity);
  }
  async create(rate: RateModel): Promise<RateModel> {
    return this.ratemapper.rateEntityToRateModel(
      await this.rateRepository.save(this.ratemapper.rateModelToRateEntity(rate)),
    );
  }
}

import { DataSource, Repository } from 'typeorm';
import { Apartment as ApartmentModel } from '../../domain/models/apartment.model';
import { ApartmentRepository } from '../../domain/repository/apartment.repository';
import { Apartment as ApartmentEntity } from '../database/principal-db/entities/apartment.entity';
import { ApartmentMapper } from '../mapper/apartment.mapper';

export class ApartmentRepositoryImpl implements ApartmentRepository {
  private apartmentRepository: Repository<ApartmentEntity>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly apartmentMapper: ApartmentMapper,
  ) {
    this.apartmentRepository = this.dataSource.getRepository(ApartmentEntity);
  }
  async create(apartmentModel: ApartmentModel): Promise<ApartmentModel> {
    return this.apartmentMapper.apartmentEntityToApartmentModel(
      await this.apartmentRepository.save(this.apartmentMapper.apartmentModelToApartmentEntity(apartmentModel)),
    );
  }
}

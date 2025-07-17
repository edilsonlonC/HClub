import { DataSource, Repository } from 'typeorm';
import { Apartment as ApartmentModel, ApartmentType } from '../../domain/models/apartment.model';
import { ApartmentRepository } from '../../domain/repository/apartment.repository';
import { Apartment as ApartmentEntity, ApartmentStatus } from '../database/principal-db/entities/apartment.entity';
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
    const result = await this.apartmentRepository
      .createQueryBuilder()
      .insert()
      .into(ApartmentEntity)
      .values({
        name: apartmentModel.getName(),
        address: apartmentModel.getAddress(),
        type: apartmentModel.getType(),
        city: apartmentModel.getCity(),
        country: apartmentModel.getCountry(),
        latitude: apartmentModel.getLatitude(),
        longitude: apartmentModel.getLongitude(),
        status: apartmentModel.getStatus(),
        location: () =>
          `ST_SRID(ST_GeomFromText('POINT(${apartmentModel.getLongitude()} ${apartmentModel.getLatitude()})'), 4326)`,
      })
      .execute();
    const apartmentId: string = result.identifiers[0].id;
    const apartmentEntity: ApartmentEntity | null = await this.apartmentRepository.findOne({
      where: { id: apartmentId },
    });
    return this.apartmentMapper.apartmentEntityToApartmentModel(apartmentEntity!);
  }
  async findById(id: string): Promise<ApartmentModel | null> {
    const apartmentEntity = await this.apartmentRepository.findOne({
      where: { id },
    });
    return apartmentEntity ? this.apartmentMapper.apartmentEntityToApartmentModel(apartmentEntity) : null;
  }
  async findByLocation(
    latitude: number,
    longitude: number,
    type: ApartmentType,
    minPrice: number,
    maxPrice: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: ApartmentModel[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const offset: number = (page - 1) * limit;
    const total: number = await this.apartmentRepository.count();
    const query = this.apartmentRepository
      .createQueryBuilder('apartment')
      .innerJoinAndSelect('apartment.rates', 'rates')
      .addSelect(
        `ST_Distance_Sphere(
								 location,
								 ST_SRID(ST_GeomFromText('POINT(${longitude} ${latitude})'), 4326)
							 )
							 `,
        'distance',
      )
      .where('status = :status', { status: ApartmentStatus.ACTIVE })
      .andWhere('NOW() BETWEEN start_date AND end_date')
      .orderBy('distance', 'ASC')
      .skip(offset)
      .take(limit);
    if (type) query.andWhere('type = :type', { type: type });
    if (minPrice) query.andWhere('price >= :minPrice', { minPrice: minPrice });
    if (maxPrice) query.andWhere('price <= :maxPrice', { maxPrice: maxPrice });

    const apartments = await query.getMany();
    return {
      data: apartments.map((apartment: any) => this.apartmentMapper.apartmentRawtoApartmentModel(apartment)),
      total: apartments.length,
      page: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}

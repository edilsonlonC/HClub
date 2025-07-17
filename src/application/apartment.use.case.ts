import { Apartment as ApartmentModel, ApartmentType } from '../domain/models/apartment.model';
import { ApartmentRepository } from '../domain/repository/apartment.repository';
import { PropertyMetadataRepository } from '../domain/repository/property.metadata.repository';

export class ApartmentUseCase {
  constructor(
    private readonly apartmentRepository: ApartmentRepository,
    private readonly propertyMetadataRepository: PropertyMetadataRepository,
  ) {}
  async createApartment(apartmentModel: ApartmentModel): Promise<ApartmentModel> {
    return this.apartmentRepository.create(apartmentModel);
  }
  async findById(id: string): Promise<ApartmentModel | null> {
    return this.apartmentRepository.findById(id);
  }
  async findByLocation(
    latitude: number,
    longitude: number,
    type: ApartmentType,
    minPrice: number,
    maxPrice: number,
    page = 1,
    limit = 10,
  ): Promise<{
    data: ApartmentModel[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const result = await this.apartmentRepository.findByLocation(
      latitude,
      longitude,
      type,
      minPrice,
      maxPrice,
      page,
      limit,
    );
    const propertyMetadata = await this.propertyMetadataRepository.findByIds(
      result.data.map((apartment) => apartment.getId()!),
    );
    const apartmentModels: ApartmentModel[] = [];
    result.data.forEach((apartment) => {
      const ap = propertyMetadata.find((propertyMetadata) => propertyMetadata.getPropertyId() === apartment.getId()!);
      apartmentModels.push(
        new ApartmentModel(
          apartment.getName(),
          apartment.getAddress(),
          apartment.getType(),
          apartment.getCity(),
          apartment.getCountry(),
          apartment.getLatitude(),
          apartment.getLongitude(),
          apartment.getStatus(),
          apartment.getId(),
          apartment.getDistance()!,
          apartment.getRates(),
          ap?.getDescription(),
          ap?.getImageUrl(),
        ),
      );
    });
    result.data = apartmentModels;
    return result;
  }
}

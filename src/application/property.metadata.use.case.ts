import { EntityAlreadyExistError } from '../domain/errors/entity.already.exist.error';
import { NotFoundEntityError } from '../domain/errors/not.found.entity.error';
import { Apartment as ApartmentModel } from '../domain/models/apartment.model';
import { PropertyMetadata as PropertyMetadataModel } from '../domain/models/property.metadata.model';
import { PropertyMetadataRepository } from '../domain/repository/property.metadata.repository';
import { ApartmentUseCase } from './apartment.use.case';

export class PropertyMetadataUseCase {
  constructor(
    private readonly propertyMetadataRepository: PropertyMetadataRepository,
    private readonly apartmentUseCase: ApartmentUseCase,
  ) {}
  async createPropertyMetadata(propertyMetadataModel: PropertyMetadataModel): Promise<PropertyMetadataModel> {
    const apartmentModel: ApartmentModel | null = await this.apartmentUseCase.findById(
      propertyMetadataModel.getPropertyId(),
    );
    if (!apartmentModel) throw new NotFoundEntityError('Apartment not found');
    const propertyMetadataModelAlreadyExist: PropertyMetadataModel | null =
      await this.propertyMetadataRepository.findById(propertyMetadataModel.getPropertyId());
    if (propertyMetadataModelAlreadyExist) throw new EntityAlreadyExistError('Property metadata already exist');
    return this.propertyMetadataRepository.create(propertyMetadataModel);
  }
  async findByIds(propertyIds: string[]): Promise<PropertyMetadataModel[]> {
    return this.propertyMetadataRepository.findByIds(propertyIds);
  }
}

import { DataSource, In, Repository } from 'typeorm';
import { PropertyMetadata as PropertyMetadataModel } from '../../domain/models/property.metadata.model';
import { PropertyMetadataRepository } from '../../domain/repository/property.metadata.repository';
import { PropertyMetadata as PropertyMetadataEntity } from '../database/secondary-db/entities/property.metadata.entity';
import { PropertyMapper } from '../mapper/property.mapper';

export class PropertyMetadataRepositoryImpl implements PropertyMetadataRepository {
  private propertyMetadataRepository: Repository<PropertyMetadataEntity>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly propertyMapper: PropertyMapper,
  ) {
    this.propertyMetadataRepository = this.dataSource.getRepository(PropertyMetadataEntity);
  }
  async create(propertyMetadata: PropertyMetadataModel): Promise<PropertyMetadataModel> {
    return this.propertyMapper.propertyEntityToPropertyModel(
      await this.propertyMetadataRepository.save(this.propertyMapper.propertyModelToPropertyEntity(propertyMetadata)),
    );
  }
  async findById(propertyId: string): Promise<PropertyMetadataModel | null> {
    const propertyMetadataEntity: PropertyMetadataEntity | null = await this.propertyMetadataRepository.findOne({
      where: { propertyId },
    });
    return propertyMetadataEntity ? this.propertyMapper.propertyEntityToPropertyModel(propertyMetadataEntity) : null;
  }
  async findByIds(propertyIds: string[]): Promise<PropertyMetadataModel[]> {
    const propertyMetadataEntities: PropertyMetadataEntity[] = await this.propertyMetadataRepository.find({
      where: { propertyId: In(propertyIds) },
    });
    return propertyMetadataEntities.map((propertyMetadataEntity) =>
      this.propertyMapper.propertyEntityToPropertyModel(propertyMetadataEntity),
    );
  }
}

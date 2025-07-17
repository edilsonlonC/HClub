import { PropertyMetadata as PropertyMetadataModel } from '../../domain/models/property.metadata.model';

export interface PropertyMetadataRepository {
  create(propertyMetadata: PropertyMetadataModel): Promise<PropertyMetadataModel>;
  findById(propertyId: string): Promise<PropertyMetadataModel | null>;
  findByIds(propertyIds: string[]): Promise<PropertyMetadataModel[]>;
}

import { PropertyMetadata as PropertyModel } from '../../domain/models/property.metadata.model';
import { PropertyMetadataCreateDTO } from '../api/DTO/property.metadata.create.dto';
import { PropertyMetadataResponseDTO } from '../api/DTO/property.metadata.response.dto';
import { PropertyMetadata as PropertyEntity } from '../database/secondary-db/entities/property.metadata.entity';

export class PropertyMapper {
  constructor() {}
  propertyModelToPropertyEntity(propertyModel: PropertyModel): PropertyEntity {
    return new PropertyEntity(
      propertyModel.getPropertyId(),
      propertyModel.getDescription(),
      propertyModel.getImageUrl(),
    );
  }

  propertyEntityToPropertyModel(propertyEntity: PropertyEntity): PropertyModel {
    return new PropertyModel(propertyEntity.propertyId, propertyEntity.description, propertyEntity.imageUrl);
  }
  propertyCreateDTOToPropertyModel(propertyCreateDTO: PropertyMetadataCreateDTO): PropertyModel {
    return new PropertyModel(
      propertyCreateDTO.getPropertyId(),
      propertyCreateDTO.getDescription(),
      propertyCreateDTO.getImageUrl(),
    );
  }
  propertyModelToPropertyMetadataResponseDTO(propertyModel: PropertyModel): PropertyMetadataResponseDTO {
    return new PropertyMetadataResponseDTO(
      propertyModel.getPropertyId(),
      propertyModel.getDescription(),
      propertyModel.getImageUrl(),
    );
  }
}

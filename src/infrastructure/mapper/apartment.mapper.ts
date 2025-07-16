import { Apartment as ApartmentModel, ApartmentStatus, ApartmentType } from '../../domain/models/apartment.model';
import { ApartmentCreateDTO } from '../api/DTO/apartment.create.dto';
import { ApartmentResponseDTO } from '../api/DTO/apartment.response.dto';
import { Apartment as ApartmentEntity } from '../database/principal-db/entities/apartment.entity';
export class ApartmentMapper {
  apartmentModelToApartmentEntity(apartmentModel: ApartmentModel): ApartmentEntity {
    return new ApartmentEntity(
      apartmentModel.getName(),
      apartmentModel.getAddress(),
      apartmentModel.getType(),
      apartmentModel.getCity(),
      apartmentModel.getCountry(),
      apartmentModel.getLatitude(),
      apartmentModel.getLongitude(),
      apartmentModel.getStatus(),
    );
  }

  apartmentEntityToApartmentModel(apartmentEntity: ApartmentEntity): ApartmentModel {
    return new ApartmentModel(
      apartmentEntity.name,
      apartmentEntity.address,
      apartmentEntity.type,
      apartmentEntity.city,
      apartmentEntity.country,
      apartmentEntity.latitude,
      apartmentEntity.longitude,
      apartmentEntity.status,
      apartmentEntity.id,
    );
  }
  apartmentCreateDTOToApartmentModel(apartmentCreateDTO: ApartmentCreateDTO): ApartmentModel {
    return new ApartmentModel(
      apartmentCreateDTO.getName(),
      apartmentCreateDTO.getAddress(),
      apartmentCreateDTO.getType() as unknown as ApartmentType,
      apartmentCreateDTO.getCity(),
      apartmentCreateDTO.getCountry(),
      apartmentCreateDTO.getLatitude(),
      apartmentCreateDTO.getLongitude(),
      apartmentCreateDTO.getStatus() as unknown as ApartmentStatus,
    );
  }
  apartmentModelToApartmentResponseDTO(apartmentModel: ApartmentModel): ApartmentResponseDTO {
    return new ApartmentResponseDTO(
      apartmentModel.getId()!,
      apartmentModel.getName(),
      apartmentModel.getAddress(),
      apartmentModel.getType(),
      apartmentModel.getCity(),
      apartmentModel.getCountry(),
      apartmentModel.getLatitude(),
      apartmentModel.getLongitude(),
      apartmentModel.getStatus(),
    );
  }
}

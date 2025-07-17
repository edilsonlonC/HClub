import { Apartment as ApartmentModel, ApartmentStatus, ApartmentType } from '../../domain/models/apartment.model';
import { Rate } from '../../domain/models/rate.model';
import { ApartmentCreateDTO } from '../api/DTO/apartment.create.dto';
import { ApartmentResponseDTO } from '../api/DTO/apartment.response.dto';
import { RateResponseDto } from '../api/DTO/rate.response.dto';
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
      apartmentModel.getDistance(),
      apartmentModel
        .getRates()
        ?.map(
          (rate) =>
            new RateResponseDto(
              rate.getId()!,
              rate.getStartDate(),
              rate.getEndDate(),
              rate.getPrice(),
              rate.getRateType(),
              rate.getApartmentId(),
            ),
        ),
      apartmentModel.getDescription(),
      apartmentModel.getImageUrl(),
    );
  }
  apartmentRawtoApartmentModel(apartmentRaw: any): ApartmentModel {
    return new ApartmentModel(
      apartmentRaw.name,
      apartmentRaw.address,
      apartmentRaw.type,
      apartmentRaw.city,
      apartmentRaw.country,
      apartmentRaw.latitude,
      apartmentRaw.longitude,
      apartmentRaw.status,
      apartmentRaw.id,
      apartmentRaw.distance,
      apartmentRaw.rates?.map(
        (rateRaw: any) =>
          new Rate(rateRaw.startDate, rateRaw.endDate, rateRaw.price, rateRaw.rateType, rateRaw.apartmentId),
      ),
    );
  }
}

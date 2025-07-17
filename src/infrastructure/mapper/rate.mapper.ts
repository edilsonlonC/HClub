import { Rate as RateEntity } from '../database/principal-db/entities/rate.entity';
import { Rate as RateModel, RateType } from '../../domain/models/rate.model';
import { RateCreateDto } from '../api/DTO/rate.create.dto';
import { RateResponseDto } from '../api/DTO/rate.response.dto';

export class RateMapper {
  constructor() {}

  rateModelToRateEntity(rateModel: RateModel): RateEntity {
    return new RateEntity(
      rateModel.getStartDate(),
      rateModel.getEndDate(),
      rateModel.getPrice(),
      rateModel.getRateType(),
      rateModel.getApartmentId(),
    );
  }
  rateEntityToRateModel(rateEntity: RateEntity): RateModel {
    return new RateModel(
      rateEntity.startDate,
      rateEntity.endDate,
      rateEntity.price,
      rateEntity.rateType,
      rateEntity.apartmentId,
    );
  }
  rateCreateDTOToRateModel(rateCreateDTO: RateCreateDto): RateModel {
    return new RateModel(
      rateCreateDTO.getStartDate(),
      rateCreateDTO.getEndDate(),
      rateCreateDTO.getPrice(),
      rateCreateDTO.getRateType() as RateType,
      rateCreateDTO.getApartmentId(),
    );
  }
  rateModelToRateResponseDTO(rateModel: RateModel): RateResponseDto {
    return new RateResponseDto(
      rateModel.getId()!,
      rateModel.getStartDate(),
      rateModel.getEndDate(),
      rateModel.getPrice(),
      rateModel.getRateType(),
      rateModel.getApartmentId(),
    );
  }
}

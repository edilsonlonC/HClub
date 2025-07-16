import { NextFunction, Request, Response } from 'express';
import { ApartmentUseCase } from '../../../application/apartment.use.case';
import { ApartmentMapper } from '../../mapper/apartment.mapper';
import { ApartmentCreateDTO } from '../DTO/apartment.create.dto';
import { Logger } from 'pino';
import { createLogger } from '../../logger';

export class ApartmentController {
  private readonly logger: Logger = createLogger();
  constructor(
    private readonly apartmentUseCase: ApartmentUseCase,
    private readonly apartmentMapper: ApartmentMapper,
  ) {}

  createApartment = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const apartmentCreateDTO: ApartmentCreateDTO = new ApartmentCreateDTO(
        request.body.name,
        request.body.address,
        request.body.type,
        request.body.city,
        request.body.country,
        request.body.latitude,
        request.body.longitude,
        request.body.status,
      );
      const apartmentModel = this.apartmentMapper.apartmentCreateDTOToApartmentModel(apartmentCreateDTO);
      const apartmentModelCreated = await this.apartmentUseCase.createApartment(apartmentModel);
      this.logger.info(`Apartment created with id ${apartmentModelCreated.getId()}`);
      return response.status(200).json({
        message: 'Apartment created successfully',
        apartment: this.apartmentMapper.apartmentModelToApartmentResponseDTO(apartmentModelCreated),
      });
    } catch (e) {
      return next(e);
    }
  };
}

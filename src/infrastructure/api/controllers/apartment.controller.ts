import { NextFunction, Request, Response } from 'express';
import { ApartmentUseCase } from '../../../application/apartment.use.case';
import { ApartmentMapper } from '../../mapper/apartment.mapper';
import { ApartmentCreateDTO } from '../DTO/apartment.create.dto';
import { Logger } from 'pino';
import { createLogger } from '../../logger';
import { apartmentSchema } from '../validators/apartment.validator';
import { badRequest } from '../errors';
import { ApartmentType } from '../../../domain/models/apartment.model';

export class ApartmentController {
  private readonly logger: Logger = createLogger();
  constructor(
    private readonly apartmentUseCase: ApartmentUseCase,
    private readonly apartmentMapper: ApartmentMapper,
  ) {}

  createApartment = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validation = apartmentSchema.validate(request.body);
      if (validation.error) {
        this.logger.error(validation.error.message);
        throw badRequest(validation.error.message);
      }
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
    } catch (e: unknown) {
      return next(e);
    }
  };

  findByLocation = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const latitude: string = request.query.latitude as string;
      const longitude: string = request.query.longitude as string;
      const page: string = request.query.page as string;
      const limit: string = request.query.limit as string;
      const type: string = request.query.type as string;
      const minPrice: string = request.query.minPrice as string;
      const maxPrice: string = request.query.maxPrice as string;
      const result = await this.apartmentUseCase.findByLocation(
        parseFloat(latitude),
        parseFloat(longitude),
        type as ApartmentType,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        parseInt(page),
        parseInt(limit),
      );
      return response.status(200).json({
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
        },
        apartments: result.data.map((apartment) =>
          this.apartmentMapper.apartmentModelToApartmentResponseDTO(apartment),
        ),
      });
    } catch (e: unknown) {
      return next(e);
    }
  };
}

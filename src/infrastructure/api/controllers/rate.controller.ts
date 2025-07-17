import { NextFunction, Request, Response } from 'express';
import { RateUseCase } from '../../../application/rate.use.case';
import { RateMapper } from '../../mapper/rate.mapper';
import { RateCreateDto } from '../DTO/rate.create.dto';
import { Rate as RateModel } from '../../../domain/models/rate.model';
import { createLogger } from '../../logger';
import { Logger } from 'pino';
import httpStatus from 'http-status-codes';
import { rateSchema } from '../validators/rate.validator';
import { badRequest } from '../errors';
export class RateController {
  private readonly logger: Logger = createLogger();
  constructor(
    private readonly rateUseCase: RateUseCase,
    private readonly rateMapper: RateMapper,
  ) {}

  createRate = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validation = rateSchema.validate(request.body);
      if (validation.error) {
        this.logger.error(validation.error.message);
        throw badRequest(validation.error.message);
      }
      const rateCreateDto: RateCreateDto = new RateCreateDto(
        request.body.startDate,
        request.body.endDate,
        request.body.price,
        request.body.apartmentId,
      );
      const rateModel: RateModel = this.rateMapper.rateCreateDTOToRateModel(rateCreateDto);
      const rateModelCreated: RateModel = await this.rateUseCase.createRate(rateModel);
      this.logger.info(`Rate created with id ${rateModelCreated.getId()}`);
      return response.status(httpStatus.CREATED).json({
        message: 'Rate created successfully',
        rate: this.rateMapper.rateModelToRateResponseDTO(rateModelCreated),
      });
    } catch (e: unknown) {
      return next(e);
    }
  };
}

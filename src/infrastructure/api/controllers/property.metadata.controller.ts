import { Logger } from 'pino';
import { PropertyMetadataUseCase } from '../../../application/property.metadata.use.case';
import { createLogger } from '../../logger';
import { PropertyMapper } from '../../mapper/property.mapper';
import { PropertyMetadataCreateDTO } from '../DTO/property.metadata.create.dto';
import { NextFunction, Request, Response } from 'express';
import { propertyMetadataSchema } from '../validators/property.metadata.validator';
import { badRequest } from '../errors';

export class PropertyMetadataController {
  private readonly logger: Logger = createLogger();
  constructor(
    private readonly propertyMetadataUseCase: PropertyMetadataUseCase,
    private readonly propertyMetadataMapper: PropertyMapper,
  ) {}
  createPropertyMetadata = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validation = propertyMetadataSchema.validate(request.body);
      if (validation.error) {
        this.logger.error(validation.error.message);
        throw badRequest(validation.error.message);
      }
      const propertyMetadataCreateDTO: PropertyMetadataCreateDTO = new PropertyMetadataCreateDTO(
        request.body.propertyId,
        request.body.description,
        request.body.imageUrl,
      );
      const propertyMetadataModel =
        this.propertyMetadataMapper.propertyCreateDTOToPropertyModel(propertyMetadataCreateDTO);
      const propertyMetadataModelCreated =
        await this.propertyMetadataUseCase.createPropertyMetadata(propertyMetadataModel);
      this.logger.info(`Property metadata created with id ${propertyMetadataModelCreated.getPropertyId()}`);
      return response.status(200).json({
        message: 'Property metadata created successfully',
        propertyMetadata:
          this.propertyMetadataMapper.propertyModelToPropertyMetadataResponseDTO(propertyMetadataModelCreated),
      });
    } catch (e: unknown) {
      return next(e);
    }
  };
}

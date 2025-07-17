import express, { Router } from 'express';
import { initDb as initPrincipalDb } from '../../database/principal-db';
import { initDb as initSecondaryDb } from '../../database/secondary-db';
import { DataSource } from 'typeorm';
import { ApartmentMapper } from '../../mapper/apartment.mapper';
import { ApartmentController } from '../controllers/apartment.controller';
import { ApartmentRepositoryImpl } from '../../repository-impl/apartment.repository.impl';
import { ApartmentUseCase } from '../../../application/apartment.use.case';
import { ApartmentRepository } from '../../../domain/repository/apartment.repository';
import { PropertyMetadataRepository } from '../../../domain/repository/property.metadata.repository';
import { PropertyMetadataRepositoryImpl } from '../../repository-impl/property.metadata.repository.impl';
import { PropertyMapper } from '../../mapper/property.mapper';
import { PropertyMetadataUseCase } from '../../../application/property.metadata.use.case';
import { PropertyMetadataController } from '../controllers/property.metadata.controller';
import { RateMapper } from '../../mapper/rate.mapper';
import { RateRepository } from '../../../domain/repository/rate.repository';
import { RateRepositoryImpl } from '../../repository-impl/rate.repository.impl';
import { RateUseCase } from '../../../application/rate.use.case';
import { RateController } from '../controllers/rate.controller';

export const initRouter = async (): Promise<Router> => {
  const dataSourcePrincipal: DataSource = await initPrincipalDb();
  const dataSourceSecondary: DataSource = await initSecondaryDb();
  const apartmentMapper: ApartmentMapper = new ApartmentMapper();
  const propertyMetadataMapper: PropertyMapper = new PropertyMapper();
  const rateMapper: RateMapper = new RateMapper();
  const apartmentRepositoryImpl: ApartmentRepository = new ApartmentRepositoryImpl(
    dataSourcePrincipal,
    apartmentMapper,
  );

  const propertyRepositoryImpl: PropertyMetadataRepository = new PropertyMetadataRepositoryImpl(
    dataSourceSecondary,
    propertyMetadataMapper,
  );

  const rateRepositoryImpl: RateRepository = new RateRepositoryImpl(dataSourcePrincipal, rateMapper);
  const apartmentUseCase: ApartmentUseCase = new ApartmentUseCase(apartmentRepositoryImpl, propertyRepositoryImpl);
  const propertyMetadataUseCase: PropertyMetadataUseCase = new PropertyMetadataUseCase(
    propertyRepositoryImpl,
    apartmentUseCase,
  );
  const rateUseCase: RateUseCase = new RateUseCase(rateRepositoryImpl, apartmentUseCase);
  const apartmentController: ApartmentController = new ApartmentController(apartmentUseCase, apartmentMapper);
  const propertyMetadataController: PropertyMetadataController = new PropertyMetadataController(
    propertyMetadataUseCase,
    propertyMetadataMapper,
  );
  const rateController: RateController = new RateController(rateUseCase, rateMapper);
  const router: Router = express.Router();
  router.post('/apartment', apartmentController.createApartment);
  router.get('/apartment/location/', apartmentController.findByLocation);
  router.post('/property-metadata', propertyMetadataController.createPropertyMetadata);
  router.post('/rate', rateController.createRate);
  return router;
};

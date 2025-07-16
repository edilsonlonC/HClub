import express, { Router } from 'express';
import { initDb as initPrincipalDb } from '../../database/principal-db';
import { DataSource } from 'typeorm';
import { ApartmentMapper } from '../../mapper/apartment.mapper';
import { ApartmentController } from '../controllers/apartment.controller';
import { ApartmentRepositoryImpl } from '../../repository-impl/apartment.repository.impl';
import { ApartmentUseCase } from '../../../application/apartment.use.case';

export const initRouter = async (): Promise<Router> => {
  const dataSourcePrincipal: DataSource = await initPrincipalDb();
  const apartmentMapper = new ApartmentMapper();
  const apartmentController = new ApartmentController(
    new ApartmentUseCase(new ApartmentRepositoryImpl(dataSourcePrincipal, apartmentMapper)),
    apartmentMapper,
  );
  const router: Router = express.Router();
  router.post('/apartment', apartmentController.createApartment);
  return router;
};

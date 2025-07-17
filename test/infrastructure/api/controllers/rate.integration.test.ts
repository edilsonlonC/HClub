import { Application } from 'express';
import TestAgent from 'supertest/lib/agent';
import { initApp } from '../../../../src/infrastructure/api/app';
import supertest from 'supertest';
import {
  Apartment,
  ApartmentType,
} from '../../../../src/infrastructure/database/principal-db/entities/apartment.entity';
import { createRandomApartment } from '../../../mock-generator/apartment.mock.generator';
import { RateCreateDto } from '../../../../src/infrastructure/api/DTO/rate.create.dto';
import { faker } from '@faker-js/faker';
describe('Rate Controller', () => {
  let app: Application;
  let request: TestAgent;
  const url: string = '/rate';
  beforeAll(async () => {
    app = await initApp();
    request = supertest(app);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });
  describe('#Create rate', () => {
    it('should return 201 when create rate', async () => {
      const apartmentEntity: Apartment = await createRandomApartment();
      const rateCreateDto: RateCreateDto = new RateCreateDto(
        '2025-08-01',
        '2025-08-26',
        faker.number.float(),
        apartmentEntity.id,
      );
      const response = await request.post(url).send(rateCreateDto);
      expect(response.status).toBe(201);
      expect(response.body.rate.apartmentId).toBe(apartmentEntity.id);
      expect(response.body.rate.rateType).toBe('monthly');
      expect(response.body.message).toBe('Rate created successfully');
    });

    it('should return 201 and type daily when is touristic', async () => {
      const apartmentEntity: Apartment = await createRandomApartment(ApartmentType.TOURISTIC);
      const rateCreateDto: RateCreateDto = new RateCreateDto(
        '2025-08-01',
        '2025-08-26',
        faker.number.float(),
        apartmentEntity.id,
      );
      const response = await request.post(url).send(rateCreateDto);
      expect(response.status).toBe(201);
      expect(response.body.rate.apartmentId).toBe(apartmentEntity.id);
      expect(response.body.rate.rateType).toBe('daily');
      expect(response.body.message).toBe('Rate created successfully');
    });
    it('should return 400 when create rate with invalid apartment id', async () => {
      const rateCreateDto: RateCreateDto = new RateCreateDto(
        '2025-08-01',
        '2025-08-26',
        faker.number.float(),
        'invalid-apartment-id',
      );
      const response = await request.post(url).send(rateCreateDto);
      expect(response.status).toBe(400);
    });
  });
});

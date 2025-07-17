import { Application } from 'express';
import TestAgent from 'supertest/lib/agent';
import supertest from 'supertest';
import { initApp } from '../../../../src/infrastructure/api/app';
import { ApartmentCreateDTO } from '../../../../src/infrastructure/api/DTO/apartment.create.dto';
import { faker } from '@faker-js/faker';

describe('Apartment Controller', () => {
  let app: Application;
  let request: TestAgent;
  const url: string = '/apartment';
  beforeAll(async () => {
    app = await initApp();
    request = supertest(app);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });
  describe('#Create apartment', () => {
    it('should return 201 when create apartment', async () => {
      const apartmentCreateDto: ApartmentCreateDTO = new ApartmentCreateDTO(
        faker.location.street(),
        faker.location.streetAddress(),
        'corporate' as any,
        faker.location.city(),
        faker.location.country(),
        faker.location.latitude(),
        faker.location.longitude(),
        'active' as any,
      );
      const response = await request.post(url).send(apartmentCreateDto);
      expect(response.status).toBe(201);
    });
  });
  it('should return 400 when create apartment with invalid data', async () => {
    const apartmentCreateDto: ApartmentCreateDTO = new ApartmentCreateDTO(
      faker.location.street(),
      faker.location.streetAddress(),
      'corporate@invalid' as any,
      faker.location.city(),
      faker.location.country(),
      faker.location.latitude(),
      faker.location.longitude(),
      'active' as any,
    );
    const response = await request.post(url).send(apartmentCreateDto);
    expect(response.status).toBe(400);
  });
});

import { ApartmentType } from '../../src/domain/models/apartment.model';
import { Apartment } from '../../src/infrastructure/database/principal-db/entities/apartment.entity';
import { faker } from '@faker-js/faker';
import { mockGenerator } from './mock.generator';
export const createRandomApartment = async (apartmentType: ApartmentType = ApartmentType.CORPORATE) => {
  const apartment: Apartment = new Apartment(
    faker.location.street(),
    faker.location.streetAddress(),
    apartmentType,
    faker.location.city(),
    faker.location.country(),
    faker.location.latitude(),
    faker.location.longitude(),
    'active' as any,
  );
  apartment.location = 'POINT(0 0)';
  return mockGenerator<Apartment>(apartment);
};

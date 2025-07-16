import { Apartment as ApartmentModel } from '../models/apartment.model';

export interface ApartmentRepository {
  create(apartmentModel: ApartmentModel): Promise<ApartmentModel>;
}

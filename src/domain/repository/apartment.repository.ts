import { Apartment as ApartmentModel, ApartmentType } from '../models/apartment.model';

export interface ApartmentRepository {
  create(apartmentModel: ApartmentModel): Promise<ApartmentModel>;
  findById(id: string): Promise<ApartmentModel | null>;
  findByLocation(
    latitude: number,
    longitude: number,
    type: ApartmentType,
    minPrice: number,
    maxPrice: number,
    page: number,
    limit: number,
  ): Promise<{
    data: ApartmentModel[];
    total: number;
    page: number;
    totalPages: number;
  }>;
}

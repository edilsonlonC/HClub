import { Apartment as ApartmentModel } from '../domain/models/apartment.model';
import { ApartmentRepository } from '../domain/repository/apartment.repository';

export class ApartmentUseCase {
  constructor(private readonly apartmentRepository: ApartmentRepository) {}
  async createApartment(apartmentModel: ApartmentModel): Promise<ApartmentModel> {
    return this.apartmentRepository.create(apartmentModel);
  }
}

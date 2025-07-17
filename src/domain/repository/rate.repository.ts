import { Rate as RateModel } from '../models/rate.model';

export interface RateRepository {
  create(rate: RateModel): Promise<RateModel>;
}

import Joi from 'joi';

export const rateSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required().min(Joi.ref('startDate')),
  price: Joi.number().positive().required(),
  apartmentId: Joi.string().uuid().required(),
});

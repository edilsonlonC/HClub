import Joi from 'joi';

export const apartmentSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  type: Joi.string().valid('corporate', 'touristic').required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  status: Joi.string().valid('active', 'inactive').required(),
});

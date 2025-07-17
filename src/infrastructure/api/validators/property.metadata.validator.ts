import Joi from 'joi';

export const propertyMetadataSchema = Joi.object({
  propertyId: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

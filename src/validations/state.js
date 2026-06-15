import Joi from 'joi';
import { joiNumber, joiString } from './index.js';

export const createStateSchema = Joi.object({
  name: joiString({ max: 100, required: true }).description('State Name Is Required'),
  countryId: joiNumber({ required: true }).description('Country ID Is Required'),
});

export const getAllStatesQuerySchema = Joi.object({
  name: joiString({ max: 100, required: false }), // Usually GET filters are optional
  countryId: joiNumber({ required: false }),
});

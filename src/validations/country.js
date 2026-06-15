import Joi from 'joi';
import { joiString, joiNumber } from './index.js';

export const createCountrySchema = Joi.object({
  name: joiString({ min: 2, max: 100 }),
});

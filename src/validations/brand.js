import Joi from 'joi';
import { joiString, joiNumber } from './index.js';

export const createBrandSchema = Joi.object({
  name: joiString({ min: 2, max: 100 }),
  price: joiNumber({ min: 0 }),
  detail: joiString({ min: 10, max: 2000, required: false }),
});

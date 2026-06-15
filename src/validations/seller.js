import Joi from 'joi';
import { joiNumber, joiString, paginationQuerySchema } from './index.js';
import { user_gender } from '../../utils/enums.js';

export const getAllSellersQuerySchema = paginationQuerySchema.concat(
  Joi.object({
    search: joiString({ max: 100, required: false }).allow('').description('Search by seller name or email'),
    gender: joiString({ required: false })
      .lowercase()
      .valid(...Object.values(user_gender))
      .description('Filter sellers by gender'),
  }),
);

export const deleteSellerSchema = Joi.object({
  sellerId: joiNumber({ required: true }).description('Seller ID to delete'),
});

import Joi from 'joi';
import { joiString, joiNumber, paginationQuerySchema } from './index.js';

const brandItemSchema = Joi.object({
  name: joiString({ min: 2, max: 100, required: true }),
  detail: joiString({ min: 5, max: 2000, required: false }),
  file_id: joiNumber({ integer: true, min: 1, required: true }),
  price: joiNumber({ min: 0, required: true }),
});

export const createProductSchema = Joi.object({
  name: joiString({ min: 2, max: 255, required: true }),
  description: joiString({ min: 10, max: 5000, required: true }),

  brands: Joi.array()
    .items(brandItemSchema)
    .default([])
    .description('An array of brand objects to be created alongside the product'),
});

export const getAllProductsQuerySchema = paginationQuerySchema.concat(
  Joi.object({
    search: joiString({ max: 255, required: false }).allow('').description('Search by product name or description'),
  }),
);

export const getProductByIdSchema = Joi.object({
  productId: joiNumber({ integer: true, min: 1, required: true }),
});

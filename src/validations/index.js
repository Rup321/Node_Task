import Joi from 'joi';

export const joiString = ({ min = 1, max = 255, required = true, trim = true } = {}) => {
  let schema = Joi.string();

  if (trim) schema = schema.trim();
  if (min !== undefined) schema = schema.min(min);
  if (max !== undefined) schema = schema.max(max);

  return required ? schema.required() : schema.optional();
};

export const joiEmail = ({ required = true } = {}) => {
  let schema = Joi.string().email().lowercase().trim();
  return required ? schema.required() : schema.optional();
};

export const joiNumber = ({ min, max, integer = false, required = true } = {}) => {
  let schema = Joi.number();

  if (integer) schema = schema.integer();
  if (min !== undefined) schema = schema.min(min);
  if (max !== undefined) schema = schema.max(max);

  return required ? schema.required() : schema.optional();
};

export const joiUuid = ({ required = true } = {}) => {
  let schema = Joi.string().uuid();
  return required ? schema.required() : schema.optional();
};

export const paginationQuerySchema = Joi.object({
  page: joiNumber({ min: 1, integer: true, required: false }).default(1),
  limit: joiNumber({ min: 1, max: 100, integer: true, required: false }).default(10),
});

import Joi from 'joi';
import { joiString, joiEmail, joiUuid, joiNumber } from './index.js';
import { user_gender, user_roles } from '../../utils/enums.js';

export const createSellerAccountSchema = Joi.object({
  name: joiString({ max: 100 }),
  email: joiEmail(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: joiString({ min: 8, max: 128 }),
  gender: Joi.string()
    .valid(...Object.values(user_gender))
    .required(),

  countryId: joiNumber({ required: true }),
  fileId: joiNumber({ required: false }),
  stateId: joiNumber({ required: true }),

  skills: Joi.array().items(joiString({ required: false })),
});

export const signUpSchema = Joi.object({
  name: joiString({ max: 100 }),
  email: joiEmail(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: joiString({ min: 8, max: 128 }),
  fileId: joiNumber({ required: false }),

  gender: Joi.string()
    .valid(...Object.values(user_gender))
    .required(),
});

export const signInSchema = Joi.object({
  email: joiEmail(),
  password: joiString({ min: 8, max: 128 }),
  role: Joi.string()
    .valid(...Object.values(user_roles))
    .required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: joiString({ required: true }),
});

import Joi from "joi";
import { db_sync_options } from "../../utils/enums.js";

export const db_config_schema = Joi.object({
  USERNAME: Joi.string().required(),
  PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
  HOST: Joi.string().required(),
  PORT: Joi.number().integer().required(),
  DIALECT: Joi.string().valid("postgres").required(),
  POOL: Joi.object({
    MAX: Joi.number().min(1).max(100),
    MIN: Joi.number().min(0).max(50),
    ACQUIRE: Joi.number().min(1000).max(60000),
    IDLE: Joi.number().min(1000).max(60000),
  }),
  RETRY: Joi.object({
    MAX: Joi.number().min(1).max(10),
  }),
  DIALECT_OPTIONS: Joi.object({
    ssl: Joi.boolean(),
    keepAlive: Joi.boolean(),
  }),
  LOGGING: Joi.boolean(),
  SYNC: Joi.string()
    .valid(...Object.values(db_sync_options))
    .required(),
});

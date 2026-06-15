import 'dotenv/config';
import { isTrue } from './commonFunctions.js';

export const CONSTANT = {
  FILE: {
    MAX_ALLOWED_FILE_SIZE_MB: 10,
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },

  JWT: {
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',

    // Distinct secrets for security
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'super_secret_access_key',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key',

    // Access tokens should be short-lived, refresh tokens long-lived
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

    JWT_PATTERN: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  },
  DB: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE_NAME,
    HOST: process.env.DB_HOST || '127.0.0.1',
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,
    DIALECT: process.env.DB_DIALECT || 'postgres',
    POOL: {
      MAX: parseInt(process.env.DB_POOL_MAX, 10) || 20,
      MIN: parseInt(process.env.DB_POOL_MIN, 10) || 5,
      ACQUIRE: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
      IDLE: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
    },
    RETRY: {
      MAX: parseInt(process.env.DB_RETRY, 10) || 3,
    },
    DIALECT_OPTIONS: {
      ssl: isTrue(process.env.DB_SSL),
      keepAlive: isTrue(process.env.DB_KEEP_ALIVE),
    },
    LOGGING: isTrue(process.env.DB_LOGGING),
    SYNC: process.env.DB_SYNC_TYPE || 'NONE',
  },

  SERVER: {
    PORT: parseInt(process.env.SERVER_PORT, 10) || 3000,
  },
  SALT_ROUNDS: 12,
};

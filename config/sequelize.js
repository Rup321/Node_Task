import { Sequelize } from "sequelize";
import { CONSTANT } from "../utils/constants.js";

const sequelize = new Sequelize({
  host: CONSTANT.DB.HOST,
  database: CONSTANT.DB.DATABASE,
  username: CONSTANT.DB.USERNAME,
  password: CONSTANT.DB.PASSWORD,
  port: CONSTANT.DB.PORT,
  dialect: CONSTANT.DB.DIALECT,

  pool: {
    max: CONSTANT.DB.POOL.MAX,
    min: CONSTANT.DB.POOL.MIN,
    acquire: CONSTANT.DB.POOL.ACQUIRE,
    idle: CONSTANT.DB.POOL.IDLE,
  },

  dialectOptions: {
    ...(CONSTANT.DB.DIALECT_OPTIONS.ssl && {
      ssl: CONSTANT.DB.DIALECT_OPTIONS.ssl,
    }),
    keepAlive: CONSTANT.DB.DIALECT_OPTIONS.keepAlive,
  },

  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true, // Native support for your soft-delete wrapper
  },

  logging: CONSTANT.DB.LOGGING ? console.log : false,
});

export default sequelize;

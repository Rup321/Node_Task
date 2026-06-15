import bcrypt from 'bcrypt';
import { user_gender, user_roles } from '../../utils/enums.js';
import { CONSTANT } from '../../utils/constants.js';

export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        values: Object.values(user_gender),
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        values: Object.values(user_roles),
        allowNull: false,
      },
      file_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      /* <---------------- indexes ----------------> */
      indexes: [
        {
          unique: true,
          fields: ['email'],
          where: {
            deleted_at: null,
          },
        },
        {
          unique: true,
          fields: ['mobile_number'],
          where: {
            deleted_at: null,
          },
        },
      ],
    },
  );

  /* <---------------- INSTANCE METHODS ----------------> */

  user.prototype.comparePassword = async function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password_hash);
  };

  /* <---------------- HOOKS ----------------> */

  const hashPasswordHook = async (userRecord) => {
    if (userRecord.changed('password_hash')) {
      userRecord.password_hash = await bcrypt.hash(userRecord.password_hash, CONSTANT.SALT_ROUNDS);
    }
  };

  user.beforeCreate(hashPasswordHook);
  user.beforeUpdate(hashPasswordHook);

  /* <---------------- ASSOCIATIONS ----------------> */

  user.associate = (models) => {
    user.hasOne(models.seller, {
      foreignKey: 'user_id',
    });

    user.hasOne(models.file, {
      foreignKey: 'file_id',
    });
  };

  return user;
};

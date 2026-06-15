export default (sequelize, DataTypes) => {
  const errorLogger = sequelize.define('errorLogger', {
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    base_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta: {
      type: DataTypes.TEXT, // Used to store the full stack trace string safely
      allowNull: true,
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return errorLogger;
};

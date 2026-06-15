export default (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  brand.associate = (models) => {
    brand.belongsTo(models.user, {
      foreignKey: 'user_id',
    });

    brand.belongsTo(models.product, {
      foreignKey: 'product_id',
    });

    brand.belongsTo(models.file, {
      foreignKey: 'file_id',
      as: 'image',
    });
  };

  return brand;
};

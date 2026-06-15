export default (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  product.associate = (models) => {
    product.belongsTo(models.user, {
      foreignKey: 'seller_id',
    });

    product.hasMany(models.brand, {
      foreignKey: 'product_id',
    });
  };

  return product;
};

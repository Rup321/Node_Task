export default (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
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
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  });

  seller.associate = (models) => {
    seller.belongsTo(models.user, {
      foreignKey: 'user_id',
    });
    seller.hasMany(models.product, {
      foreignKey: 'seller_id',
    });
    seller.belongsTo(models.country, {
      foreignKey: 'country_id',
    });
    seller.belongsTo(models.state, {
      foreignKey: 'state_id',
    });
  };

  return seller;
};

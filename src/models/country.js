export default (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  country.associate = (models) => {
    country.hasMany(models.state, {
      foreignKey: 'country_id',
    });
  };

  return country;
};

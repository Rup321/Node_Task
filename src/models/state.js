export default (sequelize, DataTypes) => {
  const state = sequelize.define('state', {
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
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  state.associate = (models) => {
    state.belongsTo(models.country, {
      foreignKey: 'country_id',
    });
  };

  return state;
};

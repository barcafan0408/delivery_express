module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    id: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
    },
    volume: {
      allowNull: false,
      type: DataTypes.INTEGER(10), // eslint-disable-line new-cap
    },
    maxWeight: {
      allowNull: false,
      type: DataTypes.INTEGER(10), // eslint-disable-line new-cap
    },
    speed: {
      allowNull: false,
      type: DataTypes.INTEGER(5), // eslint-disable-line new-cap
    },
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    // deletedAt: 'removeDate',
    // paranoid: true,
  });

  return Transport;
};

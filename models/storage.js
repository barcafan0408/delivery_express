module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('Storage', {
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
    country: {
      allowNull: false,
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
    },
    house: {
      allowNull: false,
      type: DataTypes.STRING(10), // eslint-disable-line new-cap
    },
    storageType: DataTypes.ENUM('less_than_30', 'more_than_30'), // eslint-disable-line new-cap
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    //deletedAt: 'removeDate',
    //paranoid: true,
  });

  return Storage;
};

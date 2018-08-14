module.exports = (sequelize, DataTypes) => {
  const Tariff = sequelize.define('Tariff', {
    id: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idStorageSender: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Storages',
        key: 'id',
      },
    },
    idStorageReceiver: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Storages',
        key: 'id',
      },
    },
    minWeight: {
      type: DataTypes.INTEGER(10), // eslint-disable-line new-cap
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER(10), // eslint-disable-line new-cap
      allowNull: false,
    },
    fragile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.INTEGER(15), // eslint-disable-line new-cap
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    deletedAt: 'removeDate',
    paranoid: true,
  });

  return Tariff;
};

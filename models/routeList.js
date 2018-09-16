module.exports = (sequelize, DataTypes) => {
  const RouteList = sequelize.define('RouteList', {
    id: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expectingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    idTransport: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Transports',
        key: 'id',
      },
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
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    deletedAt: 'removeDate',
    paranoid: true,
  });

  return RouteList;
};

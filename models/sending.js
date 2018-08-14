module.exports = (sequelize, DataTypes) => {
  const Sending = sequelize.define('Sending', {
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
    number: {
      type: DataTypes.STRING(25), // eslint-disable-line new-cap
      allowNull: false,
      validate: { isNumeric: true },
    },
    status: DataTypes.ENUM('in_processing', 'en_route', 'ready_to_giving'), // eslint-disable-line new-cap
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
    weight: {
      allowNull: false,
      type: DataTypes.INTEGER(10), // eslint-disable-line new-cap
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER(25), // eslint-disable-line new-cap
    },
    coment: {
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
      allowNull: true,
    },
    idUserSender: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    idUserReceiver: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    fragile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER(25), // eslint-disable-line new-cap
    },
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    deletedAt: 'removeDate',
    paranoid: true,
  });

  return Sending;
};

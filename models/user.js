module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(13), // eslint-disable-line new-cap
      allowNull: false,
      // validate: { isNumeric: true },
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255), // eslint-disable-line new-cap
      allowNull: true,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING(20), // eslint-disable-line new-cap
    },
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'modifyDate',
    // deletedAt: 'removeDate',
    // paranoid: true,
  });

  return User;
};

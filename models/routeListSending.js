module.exports = (sequelize, DataTypes) => {
  const RouteListSending = sequelize.define('RouteListSending', {
    idRouteList: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'RouteLists',
        key: 'id',
      },
    },
    idSending: {
      type: DataTypes.INTEGER(11), // eslint-disable-line new-cap
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Sendings',
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

  return RouteListSending;
};

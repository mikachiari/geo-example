'use strict';
module.exports = function(sequelize, DataTypes) {
  var GeoPoints = sequelize.define('GeoPoints', {
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'geo_points'
  });

  return GeoPoints;
};

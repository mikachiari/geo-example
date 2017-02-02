'use strict';
module.exports = function(sequelize, DataTypes) {
  var UsState = sequelize.define('UsState', {
    name: { type: DataTypes.STRING(255), allowNull: false },
    short_name: { type: DataTypes.STRING(50), allowNull: false },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    geometry: { type: DataTypes.GEOMETRY, allowNull: false },
  }, {
    underscored: true,
    tableName: 'us_state'
  });

  /**
   * Return us state by given coords
   * @param  {Number|String} lat latitude
   * @param  {Number|String} lng longtitude
   * @return {Promise|Object} Promise with us state or error object
   */
  UsState.getStateByCoords = (lat, lng) => {
    if (!lat || !lng) return { error: true };

    const QUERY = `
    SELECT id, name, state FROM us_state
    WHERE ST_Contains(ST_GeomFromGeoJSON(geometry),
      ST_GeomFromGeoJSON(CONCAT('{"type": "Point", "coordinates": [', ${lng}, ', ', ${lat}, ']}')));`;

    return sequelize.query(QUERY, { type: sequelize.QueryTypes.SELECT });
  }
   return UsState;
};

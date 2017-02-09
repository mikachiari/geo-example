'use strict';
module.exports = function (sequelize, DataTypes) {
  var UsState = sequelize.define('UsState', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    geo_json: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    geo_binary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    geo_no_index: {
      type: DataTypes.TEXT,
      allowNull: false
    }
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
    if (!lat || !lng) return {
      error: true
    };

    const QUERY = `
    SELECT id, name, state FROM us_state
    WHERE ST_Contains(ST_GeomFromGeoJSON(geo_json),
      ST_GeomFromGeoJSON(CONCAT('{"type": "Point", "coordinates": [', ${lng}, ', ', ${lat}, ']}')));`;

    return sequelize.query(QUERY, {
      type: sequelize.QueryTypes.SELECT
    });
  }

  UsState.getStateCoordsIndex = (lat, lng) => {
    if (!lat || !lng) return {
      error: true
    };

    const QUERY = `
    SELECT id, name, state FROM us_state
    WHERE ST_Contains(geo_binary,
      ST_GeomFromGeoJSON(CONCAT('{"type": "Point", "coordinates": [', ${lng}, ', ', ${lat}, ']}')));`;

    return sequelize.query(QUERY, {
      type: sequelize.QueryTypes.SELECT
    });
  }

  UsState.getStateCoordsNoIndex = (lat, lng) => {
    if (!lat || !lng) return {
      error: true
    };

    const QUERY = `
    SELECT id, name, state FROM us_state
    WHERE ST_Contains(geo_no_index,
      ST_GeomFromGeoJSON(CONCAT('{"type": "Point", "coordinates": [', ${lng}, ', ', ${lat}, ']}')));`;

    return sequelize.query(QUERY, {
      type: sequelize.QueryTypes.SELECT
    });
  }

  return UsState;
};

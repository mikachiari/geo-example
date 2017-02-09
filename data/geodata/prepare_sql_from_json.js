fs = require('fs')
fs.readFile('./gz_2010_us_040_00_20m_low.json', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  try {
    const parsed = JSON.parse(data);
    const prepared = parsed.features.map((item) => {
        return {
          name: item.properties.NAME,
          state: item.properties.STATE,
          geometry: item.geometry
        }
      })
      .map((item) => {
        return `INSERT INTO us_state (name, state, geo_json) VALUES ('${item.name}', '${item.state}', '${JSON.stringify(item.geometry)}');`
      })
      .reduce((prev, next) => prev + next + '\n', "");
    console.log(prepared);
  } catch (error) {
    console.log('error', error);
  }
});

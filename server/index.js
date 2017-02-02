import Express from 'express';
import Sequelize from 'sequelize';

const app = Express();

const mysqlConn = new Sequelize('mysql://danil@localhost:3306/geo', {});

let mysqlConnectionStatus = null;
mysqlConn.authenticate()
  .then((rs) => mysqlConnectionStatus = `Connection OK`)
  .catch((rs) => mysqlConnectionStatus = `Connection NOK <br>${rs}`)

const prepareModel = (db, model) => {
  const modelFunc = require(model);
  return modelFunc(db, Sequelize);
}

const UsState = prepareModel(mysqlConn, './models/us_state');

app.get('/mysql-connection', (req, res) => {
  res.send(mysqlConnectionStatus);
});

app.get('/mysql/get-area/', (req, res) => {
  const {
    lat,
    lng
  } = req.query;
  if (!lat || !lng) {
    res.status(400).send(`No coords set<br>lat=${lat} | lng=${lng}`);
    return;
  }

  UsState.getStateByCoords(lat, lng)
    .then((rs) => {
      res.send({state: rs[0]})
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({
        error: 'error',
        payload: err
      })
    })
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

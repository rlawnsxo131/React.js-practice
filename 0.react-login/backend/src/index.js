require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');
const { jwtMiddleware } = require('lib/token');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGO_ID, MONGO_PASSWORD } = process.env;

mongoose.connect(`${MONGO_ID}@${MONGO_PASSWORD}`,
  { useNewUrlParser: true, dbName: 'reactLogin' }).then(() => {
  console.log('connect to mongoDB');
}).catch((e) => {
  console.error(e);
});

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(jwtMiddleware);
app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`connect to ${app.get('port')} port`);
});
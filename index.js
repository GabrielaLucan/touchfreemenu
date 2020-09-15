require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
  });
};

if (require.main === module) {
  app.listen(process.env.PORT);
  connect(process.env.DATABASE_URL);
  mongoose.connection.on('error', console.log);
}

module.exports = { connect };

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// const serveStatic = require('serve-static');

const app = express();
const port = process.env.PORT || 3000;

// database connection
const dbUrl = 'mongodb://localhost:27017/blood_bank';
const mongoDB = process.env.MONGODB_URI || dbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (err) => {
  debug('MongoDB connection error:');
});

app.use(morgan('tiny'));
// serve static files
app.use('/', express.static(path.join(__dirname, '/src/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');

const routes = require('./src/routes/routes');
app.use('/', routes);

// app.get('/', (req, res) => {
//   res.send(path.join(__dirname, 'app.js'));
// });

app.listen(port, () => {
  debug(`Listening to port ${chalk.cyan(port)}`);
});

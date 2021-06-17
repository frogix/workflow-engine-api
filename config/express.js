const express = require('express')
const logger = require('morgan')
const config = require('./config')
const morgan = require('morgan')
const routes = require('../server');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json())

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(morgan('combined'))

app.get('/', function (_req, res) {
  res.send('hello, world!')
})

// mount all routes on /api path
app.use('/api', routes);

module.exports = app

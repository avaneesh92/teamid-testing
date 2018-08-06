// index.js

const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World from '+ process.env.NAME+' who is a '+process.env.ROLE)
})

module.exports.handler = serverless(app);
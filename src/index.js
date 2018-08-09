// index.js

const serverless = require('serverless-http');
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

app.post('*', function (req, res) {
  res.json({out:'Hello World from '+ process.env.NAME+' who is a '+process.env.ROLE})
})

module.exports.handler = serverless(app);
// index.js

const serverless = require('serverless-http');
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.post('*', async function (req, res) {
  res.json({out:'Hello World from '+ process.env.NAME+' who is a '+process.env.ROLE+' my secret is '+process.env.JWT_SECRET})
})

module.exports.handler = serverless(app);
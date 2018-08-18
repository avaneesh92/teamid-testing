// index.js
const util = require('./commonUtils.js')
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

//Endpoint handler
const save = async function(event){
  return util.responses.success(event);
}
const get = async function(event){
  try{
    console.log("hello")
  }catch(e){
    return util.responses.error(e)
  }
}

module.exports = {save}
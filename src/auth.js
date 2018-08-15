/****************************************************************************************
 * Autherization functions
 */
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
 
const _generateToken = jsonToSign => {
    // sign with default (HMAC SHA256)
    var token = jwt.sign(jsonToSign, SECRET_KEY, { expiresIn: 2629746 });
    return token;
  };
  
const _decodeToken = function(token) {
    try {
      var decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      console.log("Token decode error ==>", error);
      return null;
    }
  };
  
const _generatePolicy = function(principalId, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (resource) {
      var policyDocument = {};
      policyDocument.Version = '2012-10-17'; // default version
      policyDocument.Statement = [];
      var statementOne = {};
      statementOne.Action = 'execute-api:Invoke'; // default action
      statementOne.Effect = "Allow";
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }
    return authResponse;
  }

const authorize = function (event, context, callback) {
        if (event.authorizationToken) {
            try {
                const token =_decodeToken(event.authorizationToken)
                const policy = _generatePolicy(token, event.methodArn);
                callback(null, policy);
            } catch (error) {
                console.log("error", error);
                callback(error.message, null);
            }
        } else {
            const response = {
                statusCode: 401,
                headers:{ 'Access-Control-Allow-Origin' : '*' },
                body: JSON.stringify({
                    status: true,
                    message: 'Authorization token required'
                })
            };
            callback(response, null);
        }
    }
module.exports = {authorize}
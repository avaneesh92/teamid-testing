/****************************************************************************************
 * Autherization functions
 */
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

//Extract method arn components
const _extractArn = async function (arn)
{
  // The value of 'arn' follows the format shown below.
  // arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"

  if (!arn)
  {
    // HTTP method and a resource path are not available.
    return [ null, null ];
  }

  var arn_elements      = arn.split(':', 6);
  var resource_elements = arn_elements[5].split('/', 4);
  var http_method       = resource_elements[2];
  var resource_path     = resource_elements[3];

  // Return the HTTP method and the resource path as a string array.
  return [ http_method, resource_path ];
}

//Generate API Gateway compatible policy
const _generatePolicy = async function(principal_id, effect, resource)
{
  return {
    principalId: principal_id,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  };
}

//
const _decodeToken = function(token) {
    try {
      var decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      return null ;
    }
  };
  

//Lambda auth function for AWS API Gateway
const authorize = async function (event,context) {
  var elements
  var httpMethod
  var resPath
    try{
        // Extract the HTTP method and the resource path from event.methodArn.
        elements = await _extractArn(event.methodArn);
        console.log(elements)
        httpMethod   = elements[0];
        resPath = elements[1];
        const accessToken = jwt.decode(event.authorizationToken);
        if(accessToken === null){
            throw {"error":""}
        }
        console.log(accessToken)
        var policy = await _generatePolicy(accessToken.id, 'Allow',resPath)
        return policy

    }
    catch(err){
        console.log(err)
        return await _generatePolicy('anonymous','Deny',resPath)
    } 
}
module.exports = {authorize}
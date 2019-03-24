var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
// Set response headers to enable CORS
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function getAllTodos(event, context, callback) {
  //The Scan operation returns one or more items and item attributes
  //by accessing every item in a table
  // Return the matching list of todos in response body
  docClient.scan({ TableName: "todos" }, (error, data) => {
    if (error) {
      // Return status code 500 on error
      var failureResponse = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, failureResponse);
    } else {
      // Return status code 200 on success
      var successResponse = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data.Items)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = getAllTodos;

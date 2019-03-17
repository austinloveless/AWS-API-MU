var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function getAllTodos(event, context, callback) {
  docClient.scan({ TableName: "todos" }, (error, data) => {
    if (error) {
      var failureResponse = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, failureResponse);
    } else {
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

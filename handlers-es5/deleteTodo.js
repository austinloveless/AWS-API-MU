var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function deleteTodo(event, context, callback) {
  var params = {
    TableName: "todos",
    Key: {
      todoId: event.pathParameters.id
    }
  };

  docClient.delete(params, (error, data) => {
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
        body: JSON.stringify(data)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = deleteTodo;

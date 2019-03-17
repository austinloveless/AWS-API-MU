var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function updateTodo(event, context, callback) {
  var data = JSON.parse(event.body);
  var params = {
    TableName: "todos",
    Key: {
      todoId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  };
  docClient.update(params, (error, data) => {
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

module.exports = updateTodo;

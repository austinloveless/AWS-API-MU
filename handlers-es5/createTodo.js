var uuid = require("uuid");
var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function createTodo(event, context, callback) {
  var data = JSON.parse(event.body);
  var params = {
    TableName: "todos",
    Item: {
      todoId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };
  docClient.put(params, (error, data) => {
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
        body: JSON.stringify(params.Item)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = createTodo;

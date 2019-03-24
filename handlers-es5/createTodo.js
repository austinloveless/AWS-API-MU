var uuid = require("uuid");
var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
// Set response headers to enable CORS
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function createTodo(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  var data = JSON.parse(event.body);
  var params = {
    TableName: "todos",
    // Item contains the attributes of the item to be created
    // - todoId: a unique uuid
    // - content: parsed from request body
    // - createdAt: current Unix timestamp
    // Name of the table in which to write the item.
    Item: {
      todoId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };

  docClient.put(params, (error, data) => {
    // creates a new todo
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
        body: JSON.stringify(params.Item)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = createTodo;

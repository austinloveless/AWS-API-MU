var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
// Set response headers to enable CORS
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function updateTodo(event, context, callback) {
  var data = JSON.parse(event.body);
  var params = {
    TableName: "todos",
    // Key defines the partition key and sort key of the item to be updated
    // - todoId: path parameter
    Key: {
      todoId: event.pathParameters.id
    },
    // UpdateExpression defines the attributes to be updated
    // ExpressionAttributeValues defines the value in the update expression
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null
    },
    // ReturnValues specifies if and how to return the items attributes,
    // where ALL_NEW returns all attributes of the item after the update
    ReturnValues: "ALL_NEW"
  };
  //Updates selected todo based on id
  docClient.update(params, (error, data) => {
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
        body: JSON.stringify(data)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = updateTodo;

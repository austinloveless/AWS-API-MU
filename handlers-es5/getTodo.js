var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
// Set response headers to enable CORS
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function getTodo(event, context, callback) {
  var params = {
    TableName: "todos",
    // Key defines the partition key and sort key of the item to be retrieved
    // - todoId: path parameter
    Key: {
      todoId: event.pathParameters.id
    }
  };
  // Return the selected todo based on id
  docClient.get(params, (error, data) => {
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
        body: JSON.stringify(data.Item)
      };
      callback(null, successResponse);
    }
  });
}

module.exports = getTodo;

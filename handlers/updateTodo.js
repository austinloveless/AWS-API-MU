import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const updateTodo = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
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
  try {
    const result = await dynamoDbLib.call("update", params);
    //Updates selected todo based on id
    return successResponse({ status: true });
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { updateTodo };

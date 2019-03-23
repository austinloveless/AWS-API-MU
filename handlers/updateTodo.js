import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const updateTodo = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
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
  try {
    const result = await dynamoDbLib.call("update", params);
    //Updates selected todo based on id
    return successResponse({ status: true });
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { updateTodo };

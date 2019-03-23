import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const deleteTodo = async (event, context) => {
  const params = {
    TableName: "todos",
    Key: {
      todoId: event.pathParameters.id
    }
  };
  try {
    const result = await dynamoDbLib.call("delete", params);
    // Deletes todo based on id
    return successResponse({ status: true });
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { deleteTodo };

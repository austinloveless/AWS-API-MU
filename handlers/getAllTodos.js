import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const getAllTodos = async (event, context) => {
  try {
    const result = await dynamoDbLib.call("scan", { TableName: "todos" });
    // Return the matching list of todos in response body
    return successResponse(result.Items);
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { getAllTodos };

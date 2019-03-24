import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const getTodo = async (event, context) => {
  const params = {
    // Key defines the partition key and sort key of the item to be retrieved
    // - todoId: path parameter
    TableName: "todos",
    Key: {
      todoId: event.pathParameters.id
    }
  };
  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the selected todo based on id
      return successResponse(result.Item);
    } else {
      return failureResponse({ status: false, error: "Item not found." });
    }
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { getTodo };

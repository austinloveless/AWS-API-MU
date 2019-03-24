import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const createTodo = async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    // Item contains the attributes of the item to be created
    // - todoId: a unique uuid
    // - content: parsed from request body
    // - createdAt: current Unix timestamp
    // Name of the table in which to write the item.
    TableName: "todos",
    Item: {
      todoId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    // creates a new todo
    return successResponse(params.Item);
  } catch (error) {
    return failureResponse({ status: false });
  }
};

export { createTodo };

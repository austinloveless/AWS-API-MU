import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb";
import { successResponse, failureResponse } from "../libs/responses";

const createTodo = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
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

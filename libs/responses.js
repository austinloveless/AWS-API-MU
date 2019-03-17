const successResponse = body => {
  return buildResponse(200, body);
};

const failureResponse = body => {
  return buildResponse(500, body);
};

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
};

export { failureResponse, successResponse };

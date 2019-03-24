// Return status code 200 on success
const successResponse = body => {
  return buildResponse(200, body);
};

// Return status code 500 on error
const failureResponse = body => {
  return buildResponse(500, body);
};

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    // Set response headers to enable CORS
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
};

export { failureResponse, successResponse };

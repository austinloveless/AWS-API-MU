import AWS from "aws-sdk";

// passes a DynamoDB action along with
// parameters to query the DB
const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
};

export { call };

import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import * as AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "Meals_Table";

export async function hander(
  event: APIGatewayProxyEvent,
  callback: APIGatewayProxyCallback
) {
  if (!event.body) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing body",
      }),
    });
  }

  const { data: eventData } = JSON.parse(event.body);

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "date = :date",
    ExpressionAttributeValues: {
      ":date": JSON.stringify(eventData.date),
    },
  };

  const res = await dynamoDB.query(params).promise();

  if (!res)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid Input",
      }),
    });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  });
}

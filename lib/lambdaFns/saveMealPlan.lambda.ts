import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || "";
const id = uuidv4();

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
    Item: {
      id,
      date: new Date().toISOString(),
      mealType: eventData.mealType,
      mealPreparation: eventData.mealPreparation,
      mealSize: eventData.mealSize,
    },
  };

  await dynamoDB.put(params).promise();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: "Meal plan saved!",
    }),
  });
}

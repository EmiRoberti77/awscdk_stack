import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteSpaces (
  event:APIGatewayProxyEvent, 
  dbClient:DynamoDBClient):Promise<APIGatewayProxyResult>{
  
  return {
    statusCode:400,
    body:JSON.stringify('')
  }
}
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {DynamoDBClient, PutItemCommand} from '@aws-sdk/client-dynamodb'
import { v4 } from "uuid";
import { marshall } from "@aws-sdk/util-dynamodb";

export async function postspaces(
  event: APIGatewayProxyEvent, 
  dbClient: DynamoDBClient) : Promise<APIGatewayProxyResult> {

    const randomId = v4();
    const item = JSON.parse(event.body!);

    const result = await dbClient.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      
      Item:{
        id:{
          S: randomId
        },
        location:{
          S:item.location
        }
      }
    }))

     console.log(result);

     return {
       statusCode:201,
       body:JSON.stringify({
         id: randomId
       })
     }
  }
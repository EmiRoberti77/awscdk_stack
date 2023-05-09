import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {DynamoDBClient, PutItemCommand} from '@aws-sdk/client-dynamodb'
import { marshall } from "@aws-sdk/util-dynamodb";
import { SpaceEntry } from "../model/Model";
import { validateAsEntry } from "../shared/Validator";
import { createRaddomID, parseJSON } from "../shared/Util";

export async function postspaces(
  event: APIGatewayProxyEvent, 
  dbClient: DynamoDBClient) : Promise<APIGatewayProxyResult> {

    const randomId = createRaddomID()
    const item:SpaceEntry = parseJSON(event.body!) as SpaceEntry;
    item.id = randomId
    validateAsEntry(item)

    const result = await dbClient.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item:marshall(item)
    }))

     console.log(result);

     return {
       statusCode:201,
       body:JSON.stringify({
         id: randomId
       })
     }
  }
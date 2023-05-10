import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { hasAdminGroup } from "../shared/Util";

const ID:string = 'id';

export async function deleteSpaces (
  event:APIGatewayProxyEvent, 
  dbClient:DynamoDBClient):Promise<APIGatewayProxyResult>{
  
  //get ID to pass to db query
  if(event.queryStringParameters && (ID in event.queryStringParameters)){

    if(!hasAdminGroup(event)){
      return {
        statusCode:401,
        body:JSON.stringify('Token no authorised for this group')
      }
    }

    const spaceId = event.queryStringParameters[ID]

    const deleteResult = await dbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key:{
        'id':{
          S: spaceId ? spaceId : ''
        }
      }
    }))

    console.log(deleteResult)

    return {
      statusCode:204,
      body: JSON.stringify(`Delete ${spaceId} succesfully`)
    }
  }

  return {
    statusCode:400,
    body:JSON.stringify('')
  }
}
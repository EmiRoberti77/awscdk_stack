import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import { AttributeValue, DynamoDBClient, UpdateItemCommand} from '@aws-sdk/client-dynamodb'

const ID:string = 'id';

export async function updatesSpaces(
  event:APIGatewayProxyEvent, 
  dbClient:DynamoDBClient):Promise<APIGatewayProxyResult>{
  
  //qualify all initial requirements
  if(event.queryStringParameters && (ID in event.queryStringParameters) && event.body){

    const spaceId = event.queryStringParameters[ID];
    //parse body first
    const parsedBody = JSON.parse(event.body);
    //body is now parsed into JSON string
    console.log('body=', event.body)
    const keys = Object.keys(parsedBody);//get first param from the body (the location to update)
    console.log('keys', keys)

    const requestBodyKey = keys[0]
    const requestBodyValue = parsedBody[requestBodyKey as any];

    console.log(`requestBodyKey=${requestBodyKey}`)
    console.log(`requestBodyValue=${requestBodyValue}`)

    const updateResults = await dbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key:{
        'id': {S: spaceId ? spaceId : '' } as AttributeValue
      },
      UpdateExpression: 'set #valNew = :new',
      ExpressionAttributeValues:{
        ':new':{
          S: requestBodyValue
        }
      },
      ExpressionAttributeNames: {
        '#valNew': requestBodyKey
      },
      ReturnValues:`UPDATED_NEW`
    }));

    return returnObject(204, JSON.stringify(updateResults.Attributes));
  }

  return returnObject(204,'default bad request')
} 

const returnObject = (statusCode: number, body:string ):APIGatewayProxyResult => {
  
  const ret = {
    statusCode,
    body 
  }

  console.log(ret);
  return ret;
}
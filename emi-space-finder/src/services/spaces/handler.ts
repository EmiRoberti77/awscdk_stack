import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {postspaces} from './PostPaces'
import { getspaces } from "./GetSpaces";


const enum HTTPMETHOD {
  GET = 'GET',
  POST = 'POST',
  NONE = 'NO HTTP METHOD FOUND'
}

const dbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {

  let httpMethod:string;
  try{
    switch(event.httpMethod){
      case HTTPMETHOD.GET:
        return await getspaces(event, dbClient);

      case HTTPMETHOD.POST:
        return await postspaces(event, dbClient)
    }

  } catch(error){
    console.log(error);
    return {
      statusCode:500,
      body:JSON.stringify(error)
    }
  }

  return {
    statusCode:404,
    body:JSON.stringify('no http method found ' + event.httpMethod)
  }
}

export {handler}
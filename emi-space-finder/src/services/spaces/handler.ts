import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {postspaces} from './PostPaces'
import { getspaces } from "./GetSpaces";
import { updatesSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JSONError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Util";


const enum HTTPMETHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  NONE = 'NO HTTP METHOD FOUND'
}

const dbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {
  
  let response:APIGatewayProxyResult;
  
  try{
    switch(event.httpMethod){
      case HTTPMETHOD.GET:
        response = await getspaces(event, dbClient);

        console.log(response);
        break;
        
      case HTTPMETHOD.POST:
        response = await postspaces(event, dbClient);
        break;

      case HTTPMETHOD.PUT:
        response = await updatesSpaces(event, dbClient);
        break;

      case HTTPMETHOD.DELETE:
        response = await deleteSpaces(event, dbClient);
        break;
    }

  } catch(error){
    console.log(error);

    if(error instanceof MissingFieldError){
      response = {
        statusCode:400,
        body:JSON.stringify(error.message)
      }
    }

    if(error instanceof JSONError){
      response = {
        statusCode:400,
        body:JSON.stringify(error.message)
      }
    }
    
    response = {
      statusCode:500,
      body:JSON.stringify(error)
    }
  }

  response = {
    statusCode:404,
    body:JSON.stringify('no http method found ' + event.httpMethod)
  }

  addCorsHeader(response);
  return response;
}

export {handler}
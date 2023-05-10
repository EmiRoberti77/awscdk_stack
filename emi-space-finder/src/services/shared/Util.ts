import { APIGatewayProxyEvent } from "aws-lambda"
import { JSONError } from "./Validator" 
import {randomUUID } from "crypto"

export function parseJSON(arg:string){
  try{
    return JSON.parse(arg)
  }catch(error){
    throw new JSONError('error parsing JSON:' + error)
  }
}

export function createRaddomID(){
  return randomUUID()
}

export function hasAdminGroup(event:APIGatewayProxyEvent):boolean{
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if(groups){
    return (groups as string).includes('admins'); 
  }
  return false;
}
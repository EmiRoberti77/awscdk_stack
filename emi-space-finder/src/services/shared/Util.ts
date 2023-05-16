import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { JSONError } from "./Validator" 
import {randomUUID } from "crypto"
import { Fn, Stack } from "aws-cdk-lib";

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


export function getSuffixFromStack(stack: Stack){
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId));
    const suffix = Fn.select(4, Fn.split('-', shortStackId));
    return suffix;
}

export function addCorsHeader(arg:APIGatewayProxyResult){
  if(!arg.headers) {
    arg.headers = {}
  }
  arg.headers['Access-Control-Allow-Origin'] = '*';
  arg.headers['Access-Control-Allow-Method'] = '*';
}
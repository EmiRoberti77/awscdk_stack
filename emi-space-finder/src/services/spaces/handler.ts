import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const enum HTTPMETHOD {
  GET = 'GET',
  POST = 'POST',
  NONE = 'NO HTTP METHOD FOUND'
}

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {

  let httpMethod:string;
  switch(event.httpMethod){
    case HTTPMETHOD.GET:
      httpMethod = 'httpMethod used is ' + HTTPMETHOD.GET;
      break;

    case HTTPMETHOD.POST:
      httpMethod = 'httpMethod used is ' + HTTPMETHOD.POST;
      break;
    default:
      httpMethod = HTTPMETHOD.NONE
      break;
  }
  const response = {
    statusCode:200,
    body:JSON.stringify(httpMethod)
  }
  console.log(response.body)

  return response;
}

export {handler}
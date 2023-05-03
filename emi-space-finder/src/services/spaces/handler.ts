import { APIGatewayProxyEvent, Context } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context) {

  const bodyMsg =   `Hello emi apistack lambda 1`;

  const response = {
    statusCode:200,
    body:JSON.stringify(bodyMsg)
  }
  console.log(response.body)

  return response;
}

export {handler}
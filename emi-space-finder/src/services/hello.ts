import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { v4 } from "uuid";
import {S3Client, ListBucketsCommand} from '@aws-sdk/client-s3'

const s3client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {

  const command = new ListBucketsCommand({});
  const bucketList = (await s3client.send(command)).Buckets
  const bodyMsg =   `Hello emi apistack lambda ' + ${v4()}` +
                    `list:${JSON.stringify(bucketList)}`

  const response = {
    statusCode:200,
    body:JSON.stringify(bodyMsg)
  }
  console.log(response.body)

  return response;
}

export {handler}
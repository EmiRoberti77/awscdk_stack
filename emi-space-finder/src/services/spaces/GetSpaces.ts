import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {AttributeValue, DynamoDBClient, GetItemCommand, ScanCommand} from '@aws-sdk/client-dynamodb'

const ID: string = 'id';

export async function getspaces(
  event:APIGatewayProxyEvent, 
  dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters){
      if(ID in event.queryStringParameters){
        const spaceId = event.queryStringParameters[ID]
        const getItemResponse = await dbClient.send(new GetItemCommand({
          TableName: 'your-table-name',
          Key: {
            ID: { S: spaceId ? spaceId : ''} as AttributeValue
          }
        }));

        if(getItemResponse.Item){
          return {
            statusCode:200,
            body: JSON.stringify(getItemResponse.Item)
          } 
        } else {
            return {
              statusCode:404,
              body: JSON.stringify(`Space with id ${spaceId} not found`)
            }
          }
        }
      } else {
        //return missing id
        return {
          statusCode:400,
          body: JSON.stringify('ID required')
        }
      }

      const result = await dbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
      }))
  
      console.log(result.Items)
  
      return {
        statusCode:200,
        body: JSON.stringify(result.Items)
      }
    }
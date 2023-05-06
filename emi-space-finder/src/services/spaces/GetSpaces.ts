import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {AttributeValue, DynamoDBClient, GetItemCommand, ScanCommand} from '@aws-sdk/client-dynamodb'
import {unmarshall} from '@aws-sdk/util-dynamodb'

const ID: string = 'id';

export async function getspaces(
  event:APIGatewayProxyEvent, 
  dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters){

      console.log("id="+event.queryStringParameters[ID])

      if(ID in event.queryStringParameters){
        const spaceId = event.queryStringParameters[ID]
        const getItemResponse = await dbClient.send(new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: spaceId ? spaceId : ''} as AttributeValue
          }
        }));

        if(getItemResponse.Item){

          const unmarshalledItem = unmarshall(getItemResponse.Item)

          return {
            statusCode:200,
            body: JSON.stringify(unmarshalledItem)
          } 
        } else {
            return {
              statusCode:404,
              body: JSON.stringify(`Space with id ${spaceId} not found`)
            }
          }
        }
      } else {
        //no id, do a scan of database
        const result = await dbClient.send(new ScanCommand({
          TableName: process.env.TABLE_NAME
        }))
    
        console.log(result.Items)
    
        return {
          statusCode:200,
          body: JSON.stringify(result.Items)
        }
      }

      return {
        statusCode:400,
        body: JSON.stringify('No queriers matched')
    }
  }
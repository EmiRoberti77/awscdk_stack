import { handler } from "../src/services/spaces/handler"
//these are to start the debug on the terminal
//using ts-node test/Launcher.ts ( relative path to root)

process.env.AWS_REGION = 'us-east-1';
process.env.TABLE_NAME = 'SpaceTable-0e18ddc4064f'

//method name inpoint for lambda coming from  ../src/services/spaces/handler
handler({
  httpMethod: 'PUT',
  queryStringParameters: {
    id: '23f03f5c-7172-4e77-8183-599f03a920e7'
},
body:JSON.stringify({
  location: 'Torino'
})} as any,{} as any);
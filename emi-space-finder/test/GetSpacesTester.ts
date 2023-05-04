import { handler } from "../src/services/spaces/handler"
//these are to start the debug on the terminal
//using ts-node test/Launcher.ts ( relative path to root)

process.env.AWS_REGION = 'us-east-1';
process.env.TABLE_NAME = 'SpaceTable-0e18ddc4064f'

//method name inpoint for lambda coming from  ../src/services/spaces/handler
handler({
  httpMethod: 'GET'
} as any,{} as any);
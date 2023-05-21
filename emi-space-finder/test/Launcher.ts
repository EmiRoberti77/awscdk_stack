import { handler } from "../src/services/spaces/handler"
//these are to start the debug on the terminal
//using ts-node test/Launcher.ts ( relative path to root)

process.env.AWS_REGION = 'us-east-1';
process.env.TABLE_NAME = 'SpaceTable-1245202c105f'

handler({
  httpMethod: 'POST',
  body: JSON.stringify({
    location: "Barcelona"
  })
} as any,{} as any);
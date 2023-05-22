import { SNSEvent } from "aws-lambda";
import { handler } from "../src/services/monitor/handler";

const snsEvent:SNSEvent = {
  Records:[{
    Sns: {
      Message: 'this is a test message from Emi AWS CDK Project'
    }
  }]
} as any;

handler(snsEvent, {} as any);

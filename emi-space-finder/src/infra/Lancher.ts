import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LamdbaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();
const dataTable = new DataStack(app, 'DataStack');

const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  spaceTable: dataTable.spaceTable
})
new ApiStack(app, 'ApiStack', {
  helloLambdaIntegration:lambdaStack.helloLambdaIntegration
})

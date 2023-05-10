import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LamdbaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";

const app = new App();
const dataTable = new DataStack(app, 'DataStack');

const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  spaceTable: dataTable.spaceTable
})

const authStack = new AuthStack(app, 'AuthStack');

new ApiStack(app, 'ApiStack', {
  spacesLambdaIntegration:lambdaStack.spacesLambdaIntegration,
  userPool:authStack.userPool
})

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {join} from 'path';
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackProps extends StackProps {
  spaceTable: ITable;
}

export class LambdaStack extends Stack {

  public readonly spacesLambdaIntegration: LambdaIntegration;

  constructor(scope:Construct, id:string, props: LambdaStackProps){
    super(scope, id, props)

    //create lambda
    const spacesLambda = new NodejsFunction(this, "HelloLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(__dirname, '..', '..', 'services', 'spaces', 'handler.ts'),
      environment:{
        TABLE_NAME: props.spaceTable.tableName
      }
    })

    //create policies for IAM
    spacesLambda.addToRolePolicy( new PolicyStatement({
      effect: Effect.ALLOW,
      actions:[
        's3:ListAllMyBuckets',
        's3:ListBucket'
      ],
      resources:["*"] 
    }))

    //create DynamoDB rights
    spacesLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources:[props.spaceTable.tableArn],
      actions:[
        'dynamodb:PutItem',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      ]
    }))

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda)
  }
}
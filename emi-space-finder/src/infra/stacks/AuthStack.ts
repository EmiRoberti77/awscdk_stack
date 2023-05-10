import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class AuthStack extends Stack {

  public userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(event:Construct, id:string, props?:StackProps) {
    super(event, id, props);

    this.userPool = new UserPool(this, 'SpaceUserPool', {
      selfSignUpEnabled:true,
      signInAliases:{
        username:true,
        email:true
      }
    })

    new CfnOutput(this, 'SpaceUserPoolId',{
      value:this.userPool.userPoolId
    })

    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient',{
      authFlows:{
        adminUserPassword:true,
        custom:true,
        userPassword:true,
        userSrp:true
      }
    })

    new CfnOutput(this, 'SpaceUserPoolClient', {
      value: this.userPoolClient.userPoolClientId
    })
  }
}
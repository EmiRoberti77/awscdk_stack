import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Scope } from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { initializeSuffix } from "../util";

export class DataStack extends Stack{

  public readonly spaceTable: ITable;

  constructor(scope:Construct, id:string, props?: StackProps){
    super(scope, id, props);

    const suffix = initializeSuffix(this)

    this.spaceTable = new Table(this, 'SpaceTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: `SpaceTable-${suffix}`
    })
  }
}
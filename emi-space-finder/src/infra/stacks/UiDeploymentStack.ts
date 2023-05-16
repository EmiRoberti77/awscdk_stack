import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../../services/shared/Util";
import {join} from 'path';
import {existsSync} from 'fs'
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export class UiDeploymentStack extends Stack {
   constructor(scope:Construct, id:string, props?:StackProps){
      super(scope, id, props);

      //add S3 Bucket for UI applcation to be deployed

      const suffix = getSuffixFromStack(this);
      const deploymentBucket = new Bucket(this, 'uiDeploymentBuket', {
        bucketName:`space-finder-frontemd-${suffix}`
      })

      //get project dist files for UI to deploy on the 
      //S3 bucket to be served from the internet
      const uiDir = join(__dirname, '..', '..', '..', '..', 'emi-space-finder-frontend', 'dist');
      if(!existsSync(uiDir)){
        console.log(`${uiDir} does not exist`);
        return;
      }

      new BucketDeployment(this, 'SpaceFinderDeploymentUI', {
        destinationBucket:deploymentBucket,
        sources:[Source.asset(uiDir)]
      });

      const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
      deploymentBucket.grantRead(originIdentity);

      const distribution = new Distribution(this, 'Spacefinderdistribution', {
        defaultRootObject: 'index.html',
        defaultBehavior:{
          origin: new S3Origin(deploymentBucket, {
            originAccessIdentity:originIdentity
          })
        }
      });

      new CfnOutput(this, 'deploymentUiUrlOutput',{
        value:distribution.distributionDomainName
      });
    }
}
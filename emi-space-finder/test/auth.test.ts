import { Service } from "aws-cdk-lib/aws-servicediscovery";
import { AuthService } from "./AuthService";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

async function testAuth(){
  const usersname = 'emiroberti';
  const password = 'Ferrari77Emi77)'
  const service = new AuthService();
  const loginResult = await service.login(usersname, password) 


  
  //console.log(loginResult.getSignInUserSession()?.getIdToken().getJwtToken());
  const credentials = await service.generateTemporaryCredentials(loginResult)
  console.log(credentials)

  const buckets = await ListBuckets(credentials)
  console.log(buckets)
}

async function ListBuckets(credentials:any){
  const client = new S3Client({
    credentials:credentials
  });

  const command = new ListBucketsCommand({});
  const result = await client.send(command);
  return result.Buckets;
}

testAuth();
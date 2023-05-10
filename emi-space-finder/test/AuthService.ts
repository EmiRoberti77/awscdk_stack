import { type CognitoUser } from '@aws-amplify/auth';
import {Amplify, Auth} from 'aws-amplify'

const awsRegion = 'us-east-1';

Amplify.configure({
  Auth:{
    region:awsRegion,
    userPoolId: 'us-east-1_h7q7b49Q0',
    userPoolWebClientId: '3kdc4pe641v8l955p49714t36p',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  } 
})

export class AuthService {
  public async login (username:string, password:string){
    const result = await Auth.signIn(username, password) as CognitoUser;
    return result;
  }
}
import { type CognitoUser } from '@aws-amplify/auth';
import {Amplify, Auth} from 'aws-amplify'
import {  CognitoIdentityClient} from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const awsRegion = 'us-east-1';

Amplify.configure({
  Auth:{
    region:awsRegion,
    userPoolId: 'us-east-1_KTFJF5nVW',
    userPoolWebClientId: '7t5mmld5ofltl3cb2fu72vhi39',
    identityPoolId: 'us-east-1:327c9d2b-73f2-4ef8-a46a-17f036d51874',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  } 
})

export class AuthService {

  public async login (username:string, password:string){
    const result = await Auth.signIn(username, password) as CognitoUser;
    return result;
  }

  //create temporary tokem
  public async generateTemporaryCredentials(user: CognitoUser){
    if(!user){
      console.log('user null', user)
    } else {
      console.log('user not null', user)
    }

    const jwtToken = user.getSignInUserSession()!.getIdToken().getJwtToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-1_KTFJF5nVW`;
    const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            identityPoolId: 'us-east-1:327c9d2b-73f2-4ef8-a46a-17f036d51874',
            logins: {
                [cognitoIdentityPool]: jwtToken
            }
        })
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
}
}
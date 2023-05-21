import { type CognitoUser} from '@aws-amplify/auth'
import { Amplify, Auth} from 'aws-amplify'
import {AuthStack} from '../outputs.json';
import {CognitoIdentityClient} from '@aws-sdk/client-cognito-identity'
import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers'

const awsRegion = 'us-east-1';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: awsRegion,
    userPoolId: 'us-east-1_KTFJF5nVW',
    userPoolWebClientId: '7t5mmld5ofltl3cb2fu72vhi39',
    identityPoolId: 'us-east-1:327c9d2b-73f2-4ef8-a46a-17f036d51874',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
}
})

export class AuthService {

  private user:CognitoUser | undefined;
  public jwtToken: string | undefined;
  private temporaryCredential: object | undefined;

  public isAuthorized(){
    if (this.user) {
        return true;
    }
    return false;
  }

  public async login (userName:string, password:string):Promise<Object | undefined> {

    try {

      this.user = await Auth.signIn(userName, password) as CognitoUser;
      this.jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken();
      console.log('jwtToken in login => ', this.jwtToken)

      return this.user

    } catch(error){
      console.log(error);
      return undefined;
    }
  };

  public getUserName() {
    return this.user?.getUsername();
  };

  public async getTemporaryCredentials(){
    if(this.temporaryCredential){
      console.log('using existing temp credentials')
      return this.temporaryCredential;
    }
    this.temporaryCredential = await this.generateTemporaryCredentials();
    console.log('using new credentials')
    return this.temporaryCredential;
  }

  private async generateTemporaryCredentials(){
    console.log('in=>private async generateTemporaryCredentials()')
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-1_KTFJF5nVW`
    console.log('cognitoIdentityPool',cognitoIdentityPool)
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig:{
          region:awsRegion
        },
        identityPoolId:'us-east-1:327c9d2b-73f2-4ef8-a46a-17f036d51874',
        logins:{
          [cognitoIdentityPool]:this.jwtToken!
        }
      })
    });
    const credentials = await cognitoIdentity.config.credentials();
    console.log('credentials', credentials)
    return credentials;
  }
}
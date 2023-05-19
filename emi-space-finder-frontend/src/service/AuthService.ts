import { type CognitoUser} from '@aws-amplify/auth'
import { Amplify, Auth} from 'aws-amplify'
import {AuthStack} from '../outputs.json';

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

  public async login (userName:string, password:string):Promise<Object | undefined> {

    try {
      this.user = await Auth.signIn(userName, password) as CognitoUser;
      return this.user
    } catch(error){
      console.log(error);
      return undefined;
    }
  };

  public getUserName() {
    return this.user?.getUsername();
  };

}
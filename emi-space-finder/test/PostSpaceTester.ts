import { CognitoUser } from "@aws-amplify/auth";
import {handler} from "../src/services/spaces/handler"
import { AuthService } from "./AuthService"

process.env.AWS_REGION = 'us-east-1'
process.env.TABLE_NAME = 'SpaceTable-1245202c105f'



const startTest = async () => {
  const authService = new AuthService();
  //const cognitoUser = await authService.login('emiroberti', 'Ferrari77Emi77)');
  const cognitoUser = await authService.login('emival', 'Emival77)');
  const credentials  = await authService.generateTemporaryCredentials(cognitoUser)

  const space = {
    name:'emival',
    location:'val city'
  }

  //console.log(credentials);
  console.log('jwtToken',authService.jwtToken);

  handler({
    httpMethod:'POST',
    body:JSON.stringify(space),
    headers:{
      'Authorization': authService.jwtToken!
    }
  } as any, {} as any)
  .then((res)=>{
    //console.log(res)
    console.log('res body=>',res.body);
  })
  .catch((err)=>{
    //console.log(err.message)
    console.log('error');
  })
}

startTest();


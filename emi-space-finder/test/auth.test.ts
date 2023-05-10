import { AuthService } from "./AuthService";

async function testAuth(){
  const usersname = 'emiroberti';
  const password = 'Ferrari77Emi77)'
  const authServive = new AuthService();
  const resultLogin = await authServive.login(usersname, password) 
  
  console.log(resultLogin.getSignInUserSession()?.getIdToken().getJwtToken());
}

testAuth();
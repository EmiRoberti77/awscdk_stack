import React, { SyntheticEvent, useState } from 'react'
import {AuthService} from '../service/AuthService'
import {Navigate} from 'react-router-dom'

interface LoginComponentProps {
  authService: AuthService;
  setUserNameCB: (userName:string) => void
}

const LoginComponent:React.FC<LoginComponentProps> = ({authService, setUserNameCB}) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if(userName && password){
      const loginResponse = await authService.login(userName, password);
      const username2 = authService.getUserName();
      if(username2){
        setUserNameCB(username2)
      }

      if(loginResponse){
        setLoginSuccess(true);
      } else {
        setErrorMessage('invalid user credentials')
      } 
    } else {
      setErrorMessage('username password required')
    }
  }

  const renderLoginResult = () => {
    if(errorMessage){
      return <div>{errorMessage}</div>
    }
  }

  return (
    <div role="main">
      {loginSuccess && <Navigate to="/profile" replace={true} />}
      <h2>Please login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>User name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      {renderLoginResult()}
    </div>
  );
}

export default LoginComponent
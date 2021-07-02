import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [responseReg, setResponseReg] = useState('')
  const [usernameLog, setUsernameLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')
  const [responseLog, setResponseLog] = useState('')

  const register = () => {
    console.log("making post req on /auth/register")
    Axios.post('http://localhost:9000/auth/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      console.log(response.data);
      setResponseReg(response.data);
    });
  }

  const login = () => {
    console.log("making post req on /auth/login")
    Axios.post('http://localhost:9000/auth/login', {
      username: usernameLog,
      password: passwordLog
    }).then((response) => {
      console.log(response.data);
      setResponseLog(response.data);
    });
  }

  const test = () => {
    console.log("making get req on /auth/register")
    Axios.get('http://localhost:9000/auth/register', {username: usernameReg, password: passwordReg}).then((response) => {console.log(response);});
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <br/>
        <input type="text"
          onChange={(e) =>{
            setUsernameReg(e.target.value);
          }}
        />
        <br/>
        <label>Password</label>
        <br/>
        <input type="text"
          onChange={(e) =>{
            setPasswordReg(e.target.value);
          }}
        />
        <br/>
        <button onClick={register}>Register</button>
        <button onClick={test}>Test Connectivity</button>
        <br/>
        <div>{responseReg}</div>
        {/* <button onClick={test}>Register</button> */}

        {/* <form action="/auth/register" method="POST">
          <label>Username</label>
          <input type="text" id="username" name="username"/>
          <label>Password</label>
          <input type="password" id="password" name="password"/>
          <button type="submit">Register</button>
        </form> */}
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" onChange={(e) =>{
            setUsernameLog(e.target.value);
          }}/>
        <br/>
        <input type="password" placeholder="Password" onChange={(e) =>{
            setPasswordLog(e.target.value);
          }}/>
        <br/>
        <button onClick={login}>Login</button>
        <br/>
        <div>{responseLog}</div>

      </div>
    </div>
  );
}

export default App;
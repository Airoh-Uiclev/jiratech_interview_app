import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { render } from '../../../Node/api/app';


// class App extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {apiResponse:""};
//   }

//   callAPI() {
//     fetch("http://localhost:9000/test_api")
//       .then(res => res.text())
//       .then(res => this.setState({apiResponse: res}));
//   }

//   componentWillMount() {
//     this.callAPI();
//   }
  
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//         </header>
//         <p>{this.state.apiResponse}</p>
//       </div>
//     );
//   }
// }


// export default App;

import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const register = () => {
    Axios.post('http://localhost:9001/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      console.log(response);
    });
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
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username"/>
        <br/>
        <input type="password" placeholder="Password"/>
        <br/>
        <button>Login</button>
      </div>
    </div>
  );
}

export default App;
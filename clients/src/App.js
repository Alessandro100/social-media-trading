import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  axios.get(`http://127.0.0.1:5000/user`, {
    params: {
      username: 'test'
    }
  })
  .then(res => {
        console.log("GET success")
        console.log(res);
        console.log(res.data);
  })

  // axios.post(`http://127.0.0.1:5000/user`, {username: 'test user from react'}).then(res => {
  //       console.log("connection success")
  //       console.log(res);
  // })
  return (
    <div className="App">
      <h1>Hello Hoes</h1>
    </div>
  );
}

export default App;

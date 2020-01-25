import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header'

function App() {
  // axios.get(`http://127.0.0.1:5000/user`, {
  //   params: {
  //     username: 'test'
  //   }
  // })
  // .then(res => {
  //       console.log("GET success")
  //       console.log(res);
  //       console.log(res.data);
  // })

  // axios.post(`http://127.0.0.1:5000/user`, {username: 'test user from react'}).then(res => {
  //       console.log("connection success")
  //       console.log(res);
  // })
  return (
    <div className="App">
    <Header />
    </div>
  );
}

export default App;

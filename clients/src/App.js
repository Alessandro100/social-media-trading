import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  console.log("api tests")
  axios.get(`http://127.0.0.1:5000/`).then(res => {
        console.log("connection success")
        console.log(res);
  })
  return (
    <div className="App">
      <h1>Hello Friends</h1>
    </div>
  );
}

export default App;

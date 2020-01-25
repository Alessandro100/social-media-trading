import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header'

function App() {
  console.log("api tests")
  axios.get(`http://127.0.0.1:5000/`).then(res => {
        console.log("connection success")
        console.log(res);
  })

  return (
    <div className="App">
    <Header />
    </div>
  );
}

export default App;

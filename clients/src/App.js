import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header'

class App extends Component {
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

  constructor(){
    super()
    this.state = {
    }
    this.goToAlpaca = this.goToAlpaca.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.registerAlpaca = this.registerAlpaca.bind(this);
  }

  goToAlpaca() {
    console.log('hi')
    const url2 = 'https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=606c58263dae63dd827a2b1395f76150&redirect_uri=http://localhost:3000/&scope=trading'
    window.location.href = url2;
  }

  registerUser() {
    var username = 'test'
    var password = '1234'
    axios.post(`http://127.0.0.1:5000/user`, {username: username, password: password}).then(res => {
      console.log("token success")
      console.log(res);
    })
  }

  buyStock() {
    console.log("buy stock");
    var params ={
      username: 'test',
      symbol: 'msft',
      action: 'buy',
      quantity: '3'
    }
    axios.post(`http://127.0.0.1:5000/alpaca-transaction`, params).then(res => {
      console.log("BOUGHT APPLE")
      console.log(res);
    })
  }

  //make sure code is in url
  registerAlpaca() {
    console.log("helloooooooo");
    var x = this.getUrlVars();
    console.log(x);
    if(x && x['code']) {
      var code = x['code']
      console.log("AN ALPACA CODE EXISTS")
      var username = 'test'
      axios.post(`http://127.0.0.1:5000/alpaca-registration`, {username: username, code: code}).then(res => {
        console.log("token success")
        console.log(res);
      })
    }
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }

  render(){

    return (
      <div className="App">
        <Header />
        <button onClick={this.goToAlpaca}>Log into Alpaca Button</button>
        <button onClick={this.registerAlpaca}>Save Alpaca Code (check uri)</button>
        <button onClick={this.buyStock}>Buy Stock</button>
        <button onClick={this.registerUser}>Register User</button>
      </div>
    );
  }
  
}

export default App;

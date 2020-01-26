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
    this.getUserPositions = this.getUserPositions.bind(this);
    this.getUserTransactions = this.getUserTransactions.bind(this);
    this.addFollower = this.addFollower.bind(this);
    this.getUserFeed = this.getUserFeed.bind(this);
  }

  USERNAME = 'test';

  goToAlpaca() {
    console.log('hi')
    const url2 = 'https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=606c58263dae63dd827a2b1395f76150&redirect_uri=http://localhost:3000/&scope=trading'
    window.location.href = url2;
  }

  registerUser() {
    var username = this.USERNAME
    var password = '1234'
    axios.post(`http://127.0.0.1:5000/user`, {username: username, password: password}).then(res => {
      console.log("token success")
      console.log(res);
    })
  }

  buyStock() {
    console.log("buy stock");
    var params ={
      username: this.USERNAME,
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
      axios.post(`http://127.0.0.1:5000/alpaca-registration`, {username: this.USERNAME, code: code}).then(res => {
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

  getUserPositions() {
    console.log("calling position list: " + 'http://127.0.0.1:5000/position-list')
    axios.get(`http://127.0.0.1:5000/position-list`, {params: { username: this.USERNAME}}).then(res => {
          console.log("GET success")
          console.log(res);
          console.log(res.data);
    })
  }

  getUserTransactions() {
    console.log("calling position list: " + 'http://127.0.0.1:5000/transaction-list')
    axios.get(`http://127.0.0.1:5000/transaction-list`, {params: { username: this.USERNAME}}).then(res => {
          console.log("GET success")
          console.log(res);
          console.log(res.data);
    })
  }

  addFollower() {
    console.log("calling position list: " + 'http://127.0.0.1:5000/follow')
    axios.post(`http://127.0.0.1:5000/follow`, {username: this.USERNAME, username_to_follow: 'alex_test'}).then(res => {
      console.log("token success")
      console.log(res);
    })
  }

  getUserFeed(){
    console.log("calling position list: " + 'http://127.0.0.1:5000/feed')
    //this.USERNAME
    axios.get(`http://127.0.0.1:5000/feed`, {params: { username: 'test'}}).then(res => {
          console.log("GET success")
          console.log(res);
          console.log(res.data);
    })
  }

  render(){

    return (
      <div className="App">
        <Header />
        <button onClick={this.goToAlpaca}>Log into Alpaca Button</button>
        <button onClick={this.registerAlpaca}>Save Alpaca Code (check uri)</button>
        <button onClick={this.buyStock}>Buy Stock</button>
        <button onClick={this.registerUser}>Register User</button>
        <button onClick={this.getUserPositions}>User Position Test</button>
        <button onClick={this.getUserTransactions}>User Transaction Test</button>
        <button onClick={this.addFollower}>AddFollower Test</button>
        <button onClick={this.getUserFeed}>getUserFeed Test</button>
      </div>
    );
  }
  
}

export default App;

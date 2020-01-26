import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header'
import TransactionService from './Services/transaction'

class App extends Component {
  constructor(){
    super()
    this.state = {
    }
    this.registerAlpaca = this.registerAlpaca.bind(this);
    this.goToAlpaca = this.goToAlpaca.bind(this);
  }

  USERNAME = 'test';

  goToAlpaca() {
    console.log('hi')
    const url2 = 'https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=606c58263dae63dd827a2b1395f76150&redirect_uri=http://localhost:3000/&scope=trading'
    window.location.href = url2;
  }

  //make sure code is in url
  registerAlpaca() {
    //wait -> login logic needs to be fixed
    var urlVars = this.getUrlVars();
    if(urlVars && urlVars['code']) {
      var code = urlVars['code']
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


  render(){

    return (
      <div className="App">
        <Header />
        <h1>Ignore my buttons</h1>
        <button onClick={this.goToAlpaca}>Log into Alpaca Button</button>
        <button onClick={this.registerAlpaca}>Save Alpaca Code (check uri)</button>
      </div>
    );
  }
  
}

export default App;

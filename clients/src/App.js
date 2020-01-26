import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import HomePage from './Components/HomePage';
import ProfilePage from './Components/ProfilePage';

class App extends Component {


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

  state = {
    transactions: [
      {
        id: 1,
        user: 'Arthur',
        transactionType: 'bought',
        amount: 5,
        stock: 'MATLAB'
      },
      {
        id: 2,
        user: 'Nick',
        transactionType: 'sold',
        amount: 5,
        stock: 'Apple'
      },
      {
        id: 3,
        user: 'Alessandro',
        transactionType: 'bought',
        amount: 500,
        stock: 'Linux'
      },
    ],
    positions: [
      {
        id: 1,
        abv: 'AAPL',
        name: 'Apple',
        total: 1200,
        profit: '+ $120 (5%)'
      },
      {
        id: 2,
        abv: 'GOOGL',
        name: 'Google',
        total: 5000,
        profit: '+ $120 (5%)'
      },
      {
        id: 3,
        abv: 'MTLAB',
        name: 'Matlab',
        total: 1000,
        profit: '+ $120 (5%)'
      }
    ],
    followers: [{
      id: 1,
      name: 'Barf Thur',
      img:'../Logos/art.png'
     
    },
    {
      id: 2,
      name: 'Al Exandbro',
      img:'../Logos/nick.png'
      
    },
    {
      id: 3,
      name: 'Nick Blowsass',
      img:'../Logos/nick.png'
     
    },
  ]
  }

  render(){
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <HomePage state={this.state}/> } />
            <Route exact path='/profile' render={() => <ProfilePage state={this.state}/> } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


export default App;

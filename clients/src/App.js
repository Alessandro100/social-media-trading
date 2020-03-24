import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.scss';
import HomePage from './Components/Home/HomePage';
import ProfilePage from './Components/Profile/ProfilePage';
import StockInfoPage from './Components/StockInfoPage';

class App extends Component {


  goToAlpaca() {
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
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <HomePage/> } />
            <Route exact path='/profile/:username' render={(props) => <ProfilePage username={props.match.params.username}/> } />
            <Route exact path='/stockinfo/:stock_symbol' render={(props) => <StockInfoPage stockSymbol={props.match.params.stock_symbol} />} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


export default App;

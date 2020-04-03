import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.scss';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Entrance-Flow/Login';
import NewAccount from './Components/Entrance-Flow/NewAccount';
import ProfilePage from './Components/Profile/ProfilePage';
import StockInfoPage from './Components/StockInfoPage';
import UserService from './Services/user';

class App extends Component {

  state = {
    loading: true
  }

  constructor(props) {
    super(props)

    //If there is an access token without a user, then it loads it
    if (localStorage.getItem('access_token') && localStorage.getItem('access_token') !== 'null' && !UserService.username) {
      UserService.loginAccessToken(localStorage.getItem('access_token')).then(res =>{
        this.setState({loading: false})
      })
    }else {
      this.state.loading = false;
    }
  }

  userLoggedIn() {
    console.log("user logged in from login")
    this.forceUpdate();
  }

  render(){
    const {loading} = this.state;
    console.log("this is the username: " + UserService.username);
    return (
      <>
        {!loading &&(
          <BrowserRouter>
          <Switch>
            <Route exact path='/login' render={() => <Login userLoggedIn={()=>this.userLoggedIn()}/> } />
            <Route exact path='/new-account/:access_token' render={(props) => <NewAccount access_token={props.match.params.access_token}/> } />
            {UserService.username && (
              <>
              <Route exact path='/' render={() => <HomePage/> } />
              <Route exact path='/profile/:username' render={(props) => <ProfilePage username={props.match.params.username}/> } />
              <Route exact path='/stockinfo/:stock_symbol' render={(props) => <StockInfoPage stockSymbol={props.match.params.stock_symbol} />} />
              </>
            )}
            {!UserService.username && (
              <>
                <Route exact path='/' render={() => <Redirect to={'/login'}/> } />
                <Route exact path='/profile/:username' render={(props) => <Redirect to={'/login'}/> } />
                <Route exact path='/stockinfo/:stock_symbol' render={(props) => <Redirect to={'/login'}/>} />
              </>
            )}

          </Switch>
        </BrowserRouter>
        )}
        {loading &&(
          <h1>Loading...</h1>
        )}
        
      </>
    );
  }
}


export default App;

import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import './App.css';
import Header from './Components/Header'
import Timeline from './Components/Timeline'
import ItemList from './Components/ItemList'
import Transaction from './Components/Transaction'
import Positions from './Components/Positions'
import Sectors from './Components/Sectors'
import HomePage from './Components/HomePage';
import ProfilePage from './Components/ProfilePage';

class App extends Component {

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
      img: '../Logos/art.png'

    },
    {
      id: 2,
      name: 'Al Exandbro',
      img: '../Logos/nick.png'

    },
    {
      id: 3,
      name: 'Nick Blowsass',
      img: '../Logos/nick.png'

    },
    ],
    sectors: [{
      title: 'Entertainment',
      value: 25,
      color: '#E38627'

    },
    {
      title: 'Technology',
      value: 43,
      color: '#C13C37'

    },
    {
      title: 'Green Beans',
      value: 12,
      color: '#6A2135'

    },
    ]
  }

  render() {
    return (
      <>
        <BrowserRouter history={this.state.history}>
          <Switch>
            <Route exact path='/' render={() => <HomePage state={this.state}/> } />
            <Route exact path='/profile' component={ProfilePage} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


export default App;

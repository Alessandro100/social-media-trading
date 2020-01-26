import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header'
import Timeline from './Components/Timeline'
import Transaction from './Components/Transaction'

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
    ]
  }

  render(){
    return (
      <>
        <Header />
        <div className="App">
          <div className='App-Container'>
            <div className='app-columns'>
              {/* Left Components */}
            </div>
            <div className='app-columns'>
              <Timeline transactions={this.state.transactions}/>
            </div>
            <div className='app-columns'>
              {/* Right */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

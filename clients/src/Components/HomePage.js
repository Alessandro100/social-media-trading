import React, { Component } from 'react'
import Timeline from './Timeline'
import ItemList from './ItemList'
import Transaction from './Transaction'
import Positions from './Positions'
import Header from './Header'
import { BrowserRouter, Route, Link, Router, Switch } from 'react-router-dom'

export class HomePage extends Component {
    render() {
        const { transactions, positions, followers } = this.props.state
        return (
            <div className="App">
                <Header />
                <div className='App-Container'>
                    <div className='app-columns'>
                        <Positions positions={positions} />
                    </div>
                    <div className='app-columns'>
                        <Timeline transactions={transactions}/>
                    </div>
                    <div className='app-columns'>
                        {/* Right */}
                        <ItemList itemList={followers} />
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage

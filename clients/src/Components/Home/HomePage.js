import React, { Component } from 'react'
import Timeline from '../Timeline'
import ItemList from '../Item/ItemList'
import Transaction from '../Transaction'
import Positions from '../Position/Positions'
import Header from '../Header';
import TransactionService from '../../Services/transaction';
import PositionService from '../../Services/positions';
import UserService from '../../Services/user';
import AlpacaService from '../../Services/alpaca';
import './home.scss';

export class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            transactions: [],
            following: []
        }
        this.loadTransactions();
        this.loadPositions();
        this.loadFollowers();
    }

    loadTransactions() {
        TransactionService.getTransactionFeed(UserService.username).then(transactions =>{
            this.setState({transactions: transactions});
        });
    }

    loadPositions() {
        //PositionService.getUserPositions(UserService.username).then(positions =>{
        AlpacaService.getUserPositions(UserService.username).then(positions =>{
            if(positions['message'] && positions['message'] === "no positions") {
                this.setState({positions: null});
            } else {
                this.setState({positions: positions});
            }
        })
    }

    loadFollowers() {
        UserService.getUserFollowing().then(following =>{
            this.setState({following: following});
        })
    }

    addFollower() {
        /**TODO: Show a popup, ability to search users then an option to follow them*/
        /** @Laura */
    }

    render() {
        // const { positions, followers } = this.props
        const { transactions, positions, following } = this.state;
        return (
            <div className="App">
                <Header />
                <div className='App-Container'>
                    <div className='app-columns'>
                        <Positions positions={positions} />
                    </div>
                    <div className='app-columns'>
                        {transactions && (
                            <Timeline transactions={transactions}/>
                        )}
                        {(!transactions || transactions.length === 0) && (
                            <h3>Empty Feed</h3>
                        )}
                    </div>
                    <div className='app-columns'>
                        <ItemList itemList={following} headerTitle='Following' />
                        {(!following || following.length === 0 )&& (
                            <h3>Not following anyone</h3>
                        )}
                        <button className='add-follower' onClick={this.addFollower()}>Add Follower</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage

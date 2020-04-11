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
import CircularProgress from '@material-ui/core/CircularProgress';
import './home.scss';
import AddFollowerModal from '../AddFollowerModal';

export class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            following: [],
            addFollowerMode: false,
            isLoadingPositions: true,
            isLoadingTransactions: true,
            isLoadingFollowers: true
        }
        this.loadTransactions();
        this.loadPositions();
        this.loadFollowers();
        this.toggleModal = this.toggleModal.bind(this);
    }

    loadTransactions() {
        TransactionService.getTransactionFeed(UserService.username).then(transactions =>{
            this.setState({transactions: transactions, isLoadingTransactions: false});
        });
    }

    loadPositions() {
        AlpacaService.getUserPositions(UserService.username).then(positions =>{
            if(positions['message'] && positions['message'] === "no positions" || positions.length == 0) {
                this.setState({positions: null, isLoadingPositions: false});
            } else {
                this.setState({positions: positions, isLoadingPositions: false});
            }
        })
    }

    loadFollowers() {
        UserService.getUserFollowing().then(following =>{
            this.setState({following: following, isLoadingFollowers: false});
        })
    }

    updateFollowers = (object) => {
        this.loadFollowers();
    }

    toggleModal = (object) => {
        const {addFollowerMode} = this.state;
        this.setState({addFollowerMode: !addFollowerMode});
    }

    render() {
        // const { positions, followers } = this.props
        const { transactions, positions, following, isLoadingFollowers, isLoadingTransactions, isLoadingPositions, addFollowerMode } = this.state;
        return (
            <div className="App">
                <Header />
                <div className='App-Container'>
                    <div className='app-columns'>
                        {isLoadingPositions && <CircularProgress />}
                        <Positions 
                            positions={positions} 
                        />
                    </div>
                    <div className='app-columns'>
                        {isLoadingTransactions && <CircularProgress />}
                        <div className="home-card">
                            <h3>Your Feed</h3>
                            <div className="feed-box">
                                {transactions && (
                                    <Timeline 
                                        transactions={transactions}/>
                                )}
                                {(!transactions || transactions.length === 0) && (
                                    <div className="empty-item-list">
                                        <p className="home-card-subtitle">Your feed is empty.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='app-columns'>
                        {isLoadingFollowers && <CircularProgress />}
                        <ItemList 
                            itemList={following} 
                            headerTitle='Following' 
                            viewAddFollower={this.toggleModal}/>
                    </div>
                    
                    <AddFollowerModal 
                        openModal={addFollowerMode} 
                        usersFollowing={following} 
                        toggleModal={this.toggleModal}
                        updateFollowers={this.updateFollowers}/>
                </div>
            </div>
        )
    }
}

export default HomePage

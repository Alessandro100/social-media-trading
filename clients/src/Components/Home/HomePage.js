import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
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
import { Card } from 'react-bootstrap'

export class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            following: [],
            addFollowerMode: false
        }
        this.loadTransactions();
        this.loadPositions();
        this.loadFollowers();
        this.closeAddFollower = this.closeAddFollower.bind(this);
        this.viewAddFollower = this.viewAddFollower.bind(this);
    }

    loadTransactions() {
        TransactionService.getTransactionFeed(UserService.username).then(transactions =>{
            this.setState({transactions: transactions});
        });
    }

    loadPositions() {
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

    viewAddFollower = (object) => {
        this.setState({
            addFollowerMode: true
        })
    }

    closeAddFollower = (object) => {
        this.setState({
            addFollowerMode: false
        })
        console.log(this.state.addFollowerMode)
    }

    render() {
        // const { positions, followers } = this.props
        const { transactions, positions, following } = this.state;
        return (
            <div className="App">
                <Header />
                <div className='App-Container'>
                    <div className='app-columns'>
                        <Positions 
                            positions={positions} 
                        />
                    </div>
                    <div className='app-columns'>
                        {transactions && (
                            <Timeline 
                                transactions={transactions}/>
                        )}
                        {(!transactions || transactions.length === 0) && (
                            <div className="home-card">
                                <h3>Your Feed</h3>
                                <div className="empty-item-list">
                                    <p className="home-card-subtitle">Your feed is empty.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='app-columns'>
                        <ItemList 
                            itemList={following} 
                            headerTitle='Following' 
                            following={(following && following.length !== 0 )}
                            viewAddFollower={this.viewAddFollower}/>
                    </div>
                    
                    {/* Add Follower Modal */}

                    <Modal
                        open={this.state.addFollowerMode}
                        onClose={this.closeAddFollower}>
                        <div className="add-follower-modal">
                            <div className="add-follower-title">
                                <h2>User Search</h2>
                            </div>
                            <div className="add-follower-modal-body">
                                <div className="follower-search-holder">
                                <input type="search" className="follower-search"></input>
                                <Button className="btn btn-primary follower-search-btn">
                                    Search 
                                    <i className="fas fa-search"></i>
                                </Button>
                                </div>
                                <Button className="cancel-button" onClick={()=> this.closeAddFollower()}>Cancel</Button>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default HomePage

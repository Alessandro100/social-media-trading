import React, { Component } from 'react'
import Header from '../Header'
import '../../App.scss';
import ProfileHeader from './ProfileHeader';
import Graph from '../Graph';
import Positions from '../Position/Positions';
import TransactionService from '../../Services/transaction';
import UserService from '../../Services/user';
import AlpacaService from '../../Services/alpaca';
import Timeline from '../Timeline'
import Sectors from '../Sectors';
import './profile.scss';

export class ProfilePage extends Component {

    constructor(props) {
        super(props)
        /**
         * Things to get:
         * User profile
         * User positions (not available)
         * User transactions
         */
        this.state ={
            transactions: [],
            positions: [],
            userInfo: null
        }

        this.loadUserInfo();
        this.loadTransactions();
        this.loadPositions();
    }

    loadUserInfo() {
        const {username} = this.props;

        UserService.getUserInfo(username).then(userInfo =>{
            console.log(userInfo);
            this.setState({userInfo: userInfo});
        })
    }

    loadTransactions() {
        const {username} = this.props;
        TransactionService.getTransactionFeed(username).then(transactions =>{
            this.setState({transactions: transactions});
        })
    }

    loadPositions() {
        const {username} = this.props;
        console.log("LOAD POSITIONS");
        AlpacaService.getUserPositions(username).then(positions =>{
            console.log("GOT POSITIONS");
            console.log(positions);
            this.setState({positions: positions});
        })
    }

    render() {
        const { transactions, positions, userInfo } = this.state
        console.log('positions')
        console.log(positions)
        return (
            <>
            <Header />
                <div className='page-container'>
                    <div className='page-main'>
                        {userInfo && <ProfileHeader userInfo={userInfo} />}
                        <Graph />
                        {positions && <Positions positions={positions} />}
                    </div>
                    <div className='page-sidebar'>
                        <h3>Investments</h3>
                        {positions && <Sectors positions={positions}/>}
                        <div>
                            <h3>Transactions</h3>
                            {transactions && <Timeline transactions={transactions}/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage
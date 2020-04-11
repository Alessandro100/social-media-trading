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
import Sectors from '../sectors';
import './profile.scss';
import LeaderboardWidget from '../Leaderboard/LeaderboardWidget';
import Button from '@material-ui/core/Button';
import Position from '../Position/Position.js';
import '../Position/position.scss';

export class ProfilePage extends Component {

    constructor(props) {
        super(props)
        this.state ={
            transactions: [],
            positions: [],
            userInfo: null,
            leaderboardInfo: null,
            loadedFollowers: false,
            isFollowing: false
        }

        this.loadUserInfo();
        this.loadTransactions();
        this.loadPositions();
        this.loadFollowers();
        this.toggleFollowPosition = this.toggleFollowPosition.bind(this);
    }

    loadUserInfo() {
        const {username} = this.props;

        UserService.getUserInfo(username).then(userInfo =>{
            this.setState({userInfo: userInfo});
        })
    }

    loadTransactions() {
        const {username} = this.props;
        TransactionService.getTransactionFeed(username).then(transactions =>{
            this.setState({transactions: transactions});
        })
    }

    loadFollowers() {
        const {username} = this.props;
        UserService.getUserFollowing().then(following =>{
            const isFollowing = following.find(user => user.username === username) !== undefined;
            this.setState({loadedFollowers: true, isFollowing: isFollowing});
        })
    }

    loadPositions() {
        const {username} = this.props;
        AlpacaService.getUserPositions(username).then(positions =>{
            
            AlpacaService.getAndUpdateUsersAlpacaAccount(username).then(account =>{
                const freeCashPositionItem = {symbol: 'Free Cash', market_value: account['cash'], quantity: 1}
                positions.push(freeCashPositionItem)
                this.setState({positions: positions});
            })
        })
    }

    toggleFollowPosition() {
        const { isFollowing } = this.state
        const {username} = this.props;
        UserService.toggleFollowStatus(username).then(_=>{
            this.setState({isFollowing: !isFollowing});
        })
    }

    render() {
        const { transactions, positions, userInfo, loadedFollowers, isFollowing } = this.state
        const {username} = this.props;
        return (
            <>
            <Header />
                {userInfo && <ProfileHeader 
                                userInfo={userInfo}
                                username={username}
                                userServiceName={UserService.username}
                                loadedFollowers={loadedFollowers}
                                isFollowing={isFollowing}
                                toggleFollowPosition={this.toggleFollowPosition} />}
                <div className='page-container'>
                    <div className='page-main'>
                        <Graph 
                            username={ this.props.username } />
                        <div>
                            <h3>Positions</h3>
                            {positions && positions.map(position => (
                            <Position key={position.id} position={position} />
                            ))}
                        </div>
                    </div>
                    <div className='page-sidebar'>
                        <h3>Investments</h3>
                        {positions && <Sectors positions={positions}/>}
                        <h3>Leaderboard</h3>
                        <LeaderboardWidget username={username}/>
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
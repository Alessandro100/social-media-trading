import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom'
import LeaderboardService from '../../Services/leaderboard';
import './leaderboard.scss'
import UserService from '../../Services/user';

export class Leaderboard extends Component {

    constructor() {
        super();

        this.state = {
            users: []
        }

        this.loadLeaderboard();
    }

    sortUsers( a, b ) {
        if ( a.investor_score > b.investor_score ){
          return -1;
        }
        if ( a.investor_score < b.investor_score ){
          return 1;
        }
        return 0;
    }

    loadLeaderboard(){
        LeaderboardService.getAllLeaderBoard().then(users =>{
            users.sort(this.sortUsers);
            this.setState({users: users});
        })
    }

    getClassName(user) {
        let className = 'box';
        if(user.username === UserService.username) {
            className += ' active';
        }
        return className;
    }

    render() {
        const {users} = this.state;

        return(
            <>
                <Header />
                {users.map((user, index) =>(
                    (user && user.username && (
                        <div className={this.getClassName(user)}>
                            {index + 1}. <Link to={'/profile/' + user.username}>{user.username}</Link>&nbsp;{Number(user.investor_score).toFixed(2)}
                        </div>
                    ))
                    
                ))}

                
            </>
        )
    }
}
export default Leaderboard
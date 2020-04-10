import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom'
import LeaderboardService from '../../Services/leaderboard';
import './leaderboard.scss'
import UserService from '../../Services/user';
import Spinner from 'react-bootstrap/Spinner'

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
                <div className="leaderboard-title-holder">
                    <h3>Leaderboard</h3>
                    <p>See How You Rank!</p>
                </div>
                <div className="leaderboard-box-holder">
                {users.map((user, index) =>(
                    (user && user.username && (
                        <div className={this.getClassName(user)} key={user.username}>
                            <div className="leaderboard-number">{index + 1}</div>
                            <div className="leaderboard-bio-holder">
                                <img className={user.img ? "leaderboard-img" : "leaderboard-alt-img"} src={ user.img ? user.img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png' } ></img>
                                <div className="leaderboard-bio">
                                    {console.log(user)}
                                    <Link to={'/profile/' + user.username}><h3>{user.username}</h3></Link>
                                    {Number(user.investor_score).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))
                    
                ))}
                </div>

                
            </>
        )
    }
}
export default Leaderboard
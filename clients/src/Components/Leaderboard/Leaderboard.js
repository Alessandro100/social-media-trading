import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom'
import LeaderboardService from '../../Services/leaderboard';
import './leaderboard.scss'
import UserService from '../../Services/user';
import CircularProgress from '@material-ui/core/CircularProgress';

export class Leaderboard extends Component {

    constructor() {
        super();

        this.state = {
            users: [],
            isLoading: true
        }

        this.loadLeaderboard();
    }

    sortUsers( a, b ) {
        if ( Number(a.investor_score) > Number(b.investor_score) ){
          return -1;
        }
        if ( Number(a.investor_score) < Number(b.investor_score) ){
          return 1;
        }
        return 0;
    }

    loadLeaderboard(){
        LeaderboardService.getAllLeaderBoard().then(users =>{
            
            users = users.filter(u => u.username != null)
            users.sort(this.sortUsers);
            console.log("these are the users")
            console.log(users);
            this.setState({users: users, isLoading: false});
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
        const {users, isLoading} = this.state;

        return(
            <>
                <Header />
                <div className="leaderboard-title-holder">
                    <h3>Leaderboard</h3>
                </div>
                {isLoading && <CircularProgress className='leaderboard-spinner'/>}
                <div className="leaderboard-box-holder">
                {users.map((user, index) =>(
                    (user && user.username && (
                        <div className={this.getClassName(user)} key={user.username}>
                            <div className="leaderboard-number">{index + 1}</div>
                            <div className="leaderboard-bio-holder">
                                <img className={user.img ? "leaderboard-img" : "leaderboard-alt-img"} src={ user.img ? user.img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png' } ></img>
                                <div className="leaderboard-bio">
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
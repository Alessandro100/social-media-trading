import React, { Component } from 'react';
import LeaderboardService from '../../Services/leaderboard';
import './leaderboard.scss'

export class LeaderboardWidget extends Component {

    constructor(props) {
        super(props);

        this.state ={
            rank: null,
            score: null,
            percentile: null,
            isLoaded: false
        }

        this.loadLeaderboardWidgetInfo();
    }

    loadLeaderboardWidgetInfo() {
        const {username} = this.props;

        LeaderboardService.getLeaderboardWidgetInfo(username).then(info =>{
            console.log("this is the leaderboard info");
            console.log(info)
            this.setState({isLoaded: true, rank: info['rank'], score: info['investor_score'], percentile: info['percentile']})
        })
    }

    render() {
        const {rank, score, percentile, isLoaded} = this.state;
        return (
            <>
            {isLoaded && (
                <div className='leaderboard-widget box'>
                    <div className='leaderboard-row'>
                        <div>Rank:</div>
                        <div>{rank}</div>
                    </div>
                    <div className='leaderboard-row'>
                        <div>Top:</div>
                        <div>{percentile.toFixed(2)}%</div>
                    </div>
                    <div className='leaderboard-row'>
                        <div>Score:</div>
                        <div>{Number(score).toFixed(2)}</div>
                    </div>
                </div>
            )}
            </>
        )
    }
}
export default LeaderboardWidget
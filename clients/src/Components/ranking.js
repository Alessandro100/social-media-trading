import React, { Component } from 'react'
import '../App.scss';

export default class ranking extends Component {
    render() {
        
        return (
            <div className="leaderboard-container"> <h3 className="">Leaderboard</h3>
                <table> <th>Weekly Rank: {this.props.ranking.weekRank} </th>
               <th> Percentile: {this.props.ranking.percentile}</th>
                </table>
               
            </div>
        )
    }
}

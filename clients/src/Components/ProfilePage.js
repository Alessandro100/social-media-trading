import React, { Component } from 'react'
import Header from './Header'
import '../App.css';
import ProfileHeader from './ProfileHeader';
import Graph from './Graph';
import Positions from './Positions';
import Sectors from './Sectors';
import Ranking from './ranking';

export class ProfilePage extends Component {
    render() {
        const { transactions, positions, followers, sectors, ranking } = this.props.state
        console.log('positions')
        console.log(positions)
        return (
            <>
                <Header />
                <div className='profile-container'>
                    <div className='profile-main'>
                        <ProfileHeader />
                        <Graph />
                        <Positions positions={positions} />
                    </div>
                    <div className='profile-sidebar'>
                        sidebar
                        <Sectors sectors={sectors} />
                        <Ranking ranking = {ranking}/>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage
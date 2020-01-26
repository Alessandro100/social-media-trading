import React, { Component } from 'react'
import Header from './Header'
import '../App.css';
import ProfileHeader from './ProfileHeader';
import Graph from './Graph';
import Positions from './Positions';

export class ProfilePage extends Component {
    render() {
        const { transactions, positions, followers } = this.props.state
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
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage
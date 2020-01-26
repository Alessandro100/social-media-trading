import React, { Component } from 'react'
import Header from './Header'
import '../App.css';
import ProfileHeader from './ProfileHeader';
import Graph from './Graph';
import Positions from './Position/Positions';

export class ProfilePage extends Component {
    render() {
        const { transactions, positions, followers } = this.props.state
        console.log('positions')
        console.log(positions)
        return (
            <>
            <Header />
                <div className='page-container'>
                    <div className='page-main'>
                        <ProfileHeader />
                        <Graph />
                        <Positions positions={positions} />
                    </div>
                    <div className='page-sidebar'>
                        sidebar
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage
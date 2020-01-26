import React, { Component } from 'react'
import Header from './Header'
import '../App.css';
import ProfileHeader from './ProfileHeader';

export class ProfilePage extends Component {
    render() {
        return (
            <>
            <Header />
                <div className='profile-container'>
                    <div className='profile-main'>
                        <ProfileHeader />
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
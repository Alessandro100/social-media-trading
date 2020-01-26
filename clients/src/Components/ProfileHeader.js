import React, { Component } from 'react'
import background from '../Logos/background.png'
import user from '../Logos/user.png'

export class ProfileHeader extends Component {
    render() {
        return (
            <>
                <div className='img-container'>
                    <img className='profile-background' src={background} />
                    <img className='profile-user' src={user} />
                </div>
                <h1>First Last</h1>
                <h4>@handle</h4>
            </>
        )
    }
}

export default ProfileHeader

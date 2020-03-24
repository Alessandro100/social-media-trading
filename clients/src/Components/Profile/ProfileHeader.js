import React, { Component } from 'react'
import './profile.scss'

export class ProfileHeader extends Component {
    render() {
        const {userInfo} = this.props;

        const bgImg = userInfo.bg_img ? userInfo.bg_img : 'https://www.designyourway.net/blog/wp-content/uploads/2018/06/Seamless-Polygon-Background.jpg';
        const img = userInfo.img ? userInfo.img : 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

        return (
            <>
                <div className='img-container'>
                    <img className='profile-background' src={bgImg} />
                    <img className='profile-user' src={img} />
                </div>
                <h1>{userInfo.username}</h1>
            </>
        )
    }
}

export default ProfileHeader

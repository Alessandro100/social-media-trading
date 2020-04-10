import React, { Component } from 'react'
import './profile.scss'

export class ProfileHeader extends Component {
    render() {

        const {userInfo} = this.props;
        console.log(userInfo)

        const bgImg = userInfo.bg_img ? userInfo.bg_img : 'https://www.designyourway.net/blog/wp-content/uploads/2018/06/Seamless-Polygon-Background.jpg';
        const img = userInfo.img ? userInfo.img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png';

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

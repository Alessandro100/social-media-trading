import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import user from '../Logos/user.png'
import leaderboard from '../Logos/leaderboard.png'
import home from '../Logos/home.png'

export class Header extends Component {
    render() {
        return(
            <div className='app-header'>
                <Link to='/' className='header-logo' com>
                    <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_80627598-e1539959007146.jpeg?auto=format&q=60&fit=max&w=930"/>
                </Link>
                <input className='header-input' placeholder='Which stock are you interested in?'></input>
                <button className='search-button'>Search</button>
                <div className='Header-Fill' />
                <div className='header-profile'>
                    <img src='https://www.w3schools.com/w3images/avatar2.png' />
                    <Link to='/profile' className='Header-Username'>John Doe</Link>
                </div>
                <img className='Header-icon' src={home} />
                <img className='Header-icon' src={leaderboard} />
            </div>
        )
    }
}

export default Header

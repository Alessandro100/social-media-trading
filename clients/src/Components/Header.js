import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import user from '../Logos/user.png'
import leaderboard from '../Logos/leaderboard.png'
import home from '../Logos/home.png'

export class Header extends Component {
    render() {
        return(
            <div className='App-header'>
                <Link to='/' className='Header-Logo' com>
                    Logo
                </Link>
                <input className='Header-Input' placeholder='Which stock are you interested in?'></input>
                <button>Search</button>
                <div className='Header-Fill' />
                <img src={user} />
                <Link to='/profile' className='Header-Username'>Arthur Gay</Link>
                <img className='Header-icon' src={home} />
                <img className='Header-icon' src={leaderboard} />
            </div>
        )
    }
}

export default Header

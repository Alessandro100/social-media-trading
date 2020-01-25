import React, { Component } from 'react'
// import { Input, InputGroup, InputGroupButton, Button } from 'reactstrap'
import user from '../Logos/user.png'
import leaderboard from '../Logos/leaderboard.png'
import home from '../Logos/home.png'

export class Header extends Component {
    render() {
        return (
            <div className='App-header'>
                <div className='Header-Logo'>
                    Logo
                </div>
                <input className='Header-Input' placeholder='Which stock are you interested in?'></input>
                <button>Search</button>
                <div className='Header-Fill' />
                <img src={user} />
                <div className='Header-Username'>Arthur Gay</div>
                <img className='Header-icon' src={home} />
                <img className='Header-icon' src={leaderboard} />
            </div>
        )
    }
}

export default Header

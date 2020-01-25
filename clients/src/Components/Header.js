import React, { Component } from 'react'
// import { Input, InputGroup, InputGroupButton, Button } from 'reactstrap'

export class Header extends Component {
    render() {
        return (
            <div className='App-header'>
                <div className='Header-Logo'>
                    Logo
                </div>
                <input className='Header-Input' placeholder='Which stock are you interested in?'></input>
                <button>Search</button>
            </div>
        )
    }
}

export default Header

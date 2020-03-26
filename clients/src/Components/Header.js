import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import user from '../Logos/user.png'
import leaderboard from '../Logos/leaderboard.png'
import home from '../Logos/home.png'
import UserService from '../Services/user';

export class Header extends Component {

    state = {
        logout: false
    }

    logout(){
        UserService.logout();
        this.setState({logout: true})
    }

    render() {
        const { logout } = this.state;
        return(
            <div className='app-header'>
                <Link to='/' className='header-logo' com>
                    <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_80627598-e1539959007146.jpeg?auto=format&q=60&fit=max&w=930"/>
                </Link>
                {/**@TODO Laura -> Functionality of the stock search bar
                 * When starting to type a name, it should auto suggest, and when clicked should get the info for the stock
                 * and go to another page.
                 */}
                <input className='header-input' placeholder='Which stock are you interested in?'></input>
                <button className='search-button'>Search</button>
                <div className='Header-Fill' />
                
                <div className='header-profile'>
                    <img src={UserService.img} />
                    <Link to='/profile' className='Header-Username'>{UserService.username}</Link>
                </div>
                <img className='Header-icon' src={home} />
                <div onClick={()=>{this.logout()}}>LOGOUT</div>
                <img className='Header-icon' src={leaderboard} />
                {logout && <Redirect to={'/login'}/>}
            </div>
        )
    }
}

export default Header

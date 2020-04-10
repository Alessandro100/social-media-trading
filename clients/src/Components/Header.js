import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import user from '../Logos/user.png'
import leaderboard from '../Logos/leaderboard.png'
import home from '../Logos/home.png'
import UserService from '../Services/user';
import Button from '@material-ui/core/Button'
import '../App.scss';
import FuzzySearch from 'react-fuzzy'

export class Header extends Component {

    state = {
        logout: false,
        companies: [
            {id:"AAPL"},
            {id: "AMZN"},
            {id: "TOPS"},
            {id: "MSFT"},
            {id: "VVUS"},
            {id: "SHIP"},
            {id: "INTC"},
            {id: "SIRI"},
            {id: "CMCSA"},
            {id: "CSCO"},
            {id: "NVDA"},
            {id: "SBUX"},
            {id: "EBAY"},
            {id: "HBAN"},
            {id: "MRVL"},
            {id: "QCOM"},
            {id: "ATHX"},
            {id: "GILD"},
            {id: "SCON"},
            {id: "AMAT"},
            {id: "JBLU"},
            {id: "ATVI"}
        ]
    }

    logout(){
        UserService.logout();
        this.setState({logout: true})
    }

    fuzzySearch(id){
        window.location.href = '/stockInfo/'+id;
    }

    componentDidMount(){
        console.log('grab data')
        var companies = []


    }

    render() {
        const { logout, companies } = this.state;
        return(
            <div className='app-header'>
                <Link to='/' className='header-logo' com>
                    <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_80627598-e1539959007146.jpeg?auto=format&q=60&fit=max&w=930"/>
                </Link>
                <FuzzySearch
                    list={companies}
                    keys={['id']}
                    width={430}
                    placeholder="Which stock are you interested in?"
                    className="header-input"
                    resultsTemplate={(props, state, styles) => {
                        return state.results.map((val, i) => {
                          const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                          return (
                            <div
                              key={i}
                              style={style}
                              onClick={ ()=>this.fuzzySearch(val.id) }
                            >
                              {val.id}
                              <span style={{ float: 'right', opacity: 0.5 }}>by {val.id}</span>
                            </div>
                          );
                        });
                      }}
                />
                <i className="fas fa-search"></i>
                <div className='Header-Fill' />
                {UserService.username}
                <div className='circle-holder'>
                    <Link to={'/profile/' + UserService.username}>
                        <img className="Header-icon-smaller" src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png' />
                    </Link>
                </div>
                <div className="circle-holder">
                    <Link to={'/'}>
                        <img className='Header-icon-smaller' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/768px-Home_Icon.svg.png' />
                    </Link>
                </div>
                <Link to={'/leaderboard'}>
                    <div className="circle-holder">
                        <img className='Header-icon-smaller' src='https://cdn0.iconfinder.com/data/icons/social-messaging-productivity-4/128/rankings-512.png' />
                    </div>
                </Link>
                <div onClick={()=>{this.logout()}}>
                    <a href="">
                        <div className="circle-holder">
                        <img className='Header-icon-smaller' src='https://static.thenounproject.com/png/205237-200.png'></img>
                        </div>
                    </a>
                </div>
                {logout && <Redirect to={'/login'}/>}
            </div>
        )
    }
}

export default Header

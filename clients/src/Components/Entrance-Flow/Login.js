import React, { Component } from 'react';
import AlpacaService from '../../Services/alpaca';
import UserService from '../../Services/user';
import { Redirect } from "react-router-dom";
import EnvironmentVariables from '../../Constants/EnvironmentVariables';
import './entrance-flow.scss';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import HeaderImage from '../../Logos/stock-business-header.jpg';
import OceanHeaderImage from '../../Logos/ocean.jpg';
import Alpaca from '../../Logos/alpaca.jpg'
import Logo from '../../Logos/navigatr-logo.png';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            access_token: null,
            username: '',
            password: '',
            errorMessage: '',
            homeNavigateion: false
        }

        const urlVar = this.getUrlVars();
        if(urlVar && urlVar['code']) {
            //At this point the user has a code from Alpaca
            this.registerAlpaca(urlVar['code']);
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.logInUsernamePassword = this.logInUsernamePassword.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    //Once the alpaca authentication has been done, we register this code (access token) to our database
    registerAlpaca(alpacaCode) {
        AlpacaService.registerAlpaca(alpacaCode).then(user=>{
            localStorage.setItem('access_token', user['access_token']);
            console.log("hey this is the register return");
            console.log(user);
            this.setState({access_token: user['access_token']});
        });
    }

    getUrlVars() {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    logIntoAlpaca(){
        const redirectUri = EnvironmentVariables.ALPACA_REDIRECT_URL;
        const clientId = EnvironmentVariables.ALPACA_CLIENT_ID;
        const alpacaUrl = 'https://app.alpaca.markets/oauth/authorize?response_type=code&client_id='+clientId+'&redirect_uri='+redirectUri+'&scope=trading'
        window.location.href = alpacaUrl;
    }


    logInUsernamePassword = (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const {userLoggedIn} = this.props;
        UserService.login(username, password).then(user =>{
            localStorage.setItem('access_token', user['access_token']);
            userLoggedIn();
            this.setState({homeNavigateion: true})
        }, err =>{
            this.setState({errorMessage: 'wrong credentials'})
        })
    }

    render() {
        const {access_token, errorMessage, homeNavigateion} = this.state;
        return (
            <div>
                <div className="login-body">
                    <div className="login-header-image" style={{backgroundImage: `url(${OceanHeaderImage})`}}></div>
                    <h1>Welcome</h1>
                    <img className="login-alpaca" src={Logo}></img>
                    <div className="login-subtitle">Learn to Invest, Track your Progress, and Build Community.</div>
                    <div className="login-holder">
                        <div className="login-form">
                            <h3>Sign Up</h3>
                            <div className="login-form-holder">
                                <div className="login-sub-subtitle">Don't Have an Account? <br/>Join the Navigatr Community for free here:</div>
                                <Button className="btn btn-create-account" onClick={()=>this.logIntoAlpaca()}>Create Account</Button>
                            </div>
                        </div>
                        <div className="login-form">
                            <h3>Sign In</h3>
                            <div className="login-form-holder">
                                {errorMessage && <h3>{errorMessage}</h3>}
                                <form onSubmit={this.logInUsernamePassword}>
                                    <div className="login-sub-subtitle">Enter a username:</div>
                                    <input className="login-input" type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                                    <div className="login-sub-subtitle">Enter a password:</div>
                                    <input className="login-input" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br/>
                                    <Button className="btn btn-login" type="submit" value="submit">Submit</Button>
                                </form>
                            </div>
                            {access_token && <Redirect to={"/new-account/" + access_token} push={true}/>}
                            {homeNavigateion && <Redirect to={"/"} push={true}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

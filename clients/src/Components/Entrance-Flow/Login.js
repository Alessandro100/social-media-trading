import React, { Component } from 'react';
import AlpacaService from '../../Services/alpaca';
import UserService from '../../Services/user';
import { Redirect } from "react-router-dom";
import './entrance-flow.scss';

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

        if(localStorage.getItem('access_token') !== 'null') {
            console.log("going through")
            console.log(localStorage.getItem('access_token'));
            UserService.logInAccessToken(localStorage.getItem('access_token')).then(res =>{
                this.setState({homeNavigateion: true})
            })
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
        const redirectUri = 'http://localhost:3000/login/';
        const clientId = '606c58263dae63dd827a2b1395f76150';
        const alpacaUrl = 'https://app.alpaca.markets/oauth/authorize?response_type=code&client_id='+clientId+'&redirect_uri='+redirectUri+'&scope=trading'
        window.location.href = alpacaUrl;
    }


    logInUsernamePassword = (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        UserService.login(username, password).then(user =>{
            localStorage.setItem('access_token', user['access_token']);
            this.setState({homeNavigateion: true})
        }, err =>{
            this.setState({errorMessage: 'wrong credentials'})
        })
    }

    render() {
        const {access_token, errorMessage, homeNavigateion} = this.state;
        return (
            <div>
                <h1>Social Media Trading Platform</h1>
                <button onClick={()=>this.logIntoAlpaca()}>Create Account</button>
                <h3>Sign In</h3>
                {errorMessage && <h3>{errorMessage}</h3>}
                <form onSubmit={this.logInUsernamePassword}>
                    <h3>Enter a username</h3>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                    <h3>Enter a password</h3>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <input type="submit" value="Submit" />
                </form>
                {access_token && <Redirect to={"/new-account/" + access_token} push={true}/>}
                {homeNavigateion && <Redirect to={"/"} push={true}/>}
            </div>
        )
    }
}

export default Login

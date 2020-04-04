import React, { Component } from 'react';
import UserService from '../../Services/user';
import { Redirect } from "react-router-dom";
import './entrance-flow.scss';

class NewAccount extends Component {

    constructor(props){
        super(props);

        this.state={
            username: '',
            password: '',
            img: '',
            bgImg: '',
            navigate: false,
            showError: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleBgImgChange = this.handleBgImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleImgChange(event){
        this.setState({img: event.target.value});
    }

    handleBgImgChange(event){
        this.setState({bgImg: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {username, password, img, bgImg} = this.state;
        const {access_token} = this.props
        const params = {username: username, password: password, img: img, bg_img: bgImg}
        UserService.updateUserInfo(params, access_token).then(user=>{
            localStorage.setItem('access_token', user['access_token']);
            this.setState({navigate: true, showError: false})
        }, err =>{
            this.setState({showError: true})
        })
    }

    render() {
        const {navigate, showError} = this.state;
        return (
            <div>
                <h1>Create new Account Information</h1>
                <form onSubmit={this.handleSubmit}>
                    <h3>Enter a username {showError && <span>(Username is already taken)</span>}</h3>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                    <h3>Enter a password</h3>
                    <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <h3>Enter image URL</h3>
                    <input type="text" name="img" value={this.state.img} onChange={this.handleImgChange}></input>
                    <h3>Enter a background image URL</h3>
                    <input type="text" name="url" value={this.state.bgImg} onChange={this.handleBgImgChange}></input>
                    <input type="submit" value="Submit" />
                </form>
                {navigate && <Redirect to={"/"} push={true}/>}
            </div>
        )
    }
}

export default NewAccount

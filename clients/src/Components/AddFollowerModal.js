import React, { Component } from 'react'
import '../App.scss';
import Modal from '@material-ui/core/Modal'
import FuzzySearch from 'react-fuzzy'
import Button from '@material-ui/core/Button'
import UserService from '../Services/user';
import { Link } from 'react-router-dom';

class AddFollowerModal extends Component {

    constructor(props){
        super(props);

        this.state={
            usersToFollow: []
        }

        this.loadUsersToFollow();
    }

    loadUsersToFollow() {
        UserService.getAllUsers().then(users =>{
            const filteredUsers = users.filter(u => u.username != null && u.username != UserService.username);
            this.setState({usersToFollow: filteredUsers});
        })
    }

    isFollowing(username) {
        const {usersFollowing} = this.props;
        return usersFollowing.find(u => u.username == username) ? true : false;
    }

    toggleFollow(username) {
        const {updateFollowers} = this.props;
        UserService.toggleFollowStatus(username).then(_=>{
            updateFollowers()
        })
    }

    render(){
        const {openModal, toggleModal} = this.props;
        const {usersToFollow} = this.state;

        return (
            <Modal
                open={openModal}
            >
                <div className="add-follower-modal">
                    <div className="add-follower-title">
                        <h2>User Search</h2>
                    </div>
                    <div className="add-follower-modal-body">
                        <div className="follower-search-holder">
                        <FuzzySearch
                            list={usersToFollow}
                            keys={['username']}
                            width={430}
                            placeholder="Find a user to follow"
                            // className="header-input"
                            resultsTemplate={(props, state, styles) => {
                                return state.results.map((val, i) => {
                                    const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                                    return (
                                        <div
                                            key={i}
                                            style={style} 
                                            className='fuzzy-follow-search'
                                        >
                                            <div className='follow-name'>
                                                <Link to={"/profile/"+val.username}>{val.username}</Link>
                                            </div>
                                            <Button 
                                                onClick={ ()=>this.toggleFollow(val.username)}
                                                color={this.isFollowing(val.username) ? 'default' : 'primary'}
                                            >
                                                    {this.isFollowing(val.username) ? 'Unfollow' : 'Follow'}
                                            </Button>
                                        </div>
                                    );
                                });
                            }}
                        />
                        </div>
                        <Button className="cancel-button" onClick={toggleModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}


export default AddFollowerModal; 
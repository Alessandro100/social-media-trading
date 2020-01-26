import APIService from "./api";

const UserService = {
    registerUser: function(username, password) {
        return new Promise((resolve, reject) =>{
            APIService.post('user', {username: username, password: password}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserPositions: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('position-list', { username: username}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserFeed: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('feed', { username: username}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    addFollower: function(username, username_to_follow) {
        return new Promise((resolve, reject) =>{
            APIService.post('follow', {username: username, username_to_follow: username_to_follow}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    }
};

export default UserService;
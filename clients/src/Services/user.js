import APIService from "./api";

const UserService = {

    username: 'test',
    img: 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png',
    bgImg: 'https://www.designyourway.net/blog/wp-content/uploads/2018/06/Seamless-Polygon-Background.jpg',
    investorScore: 0,
    freeCash: 0,
    positions: [],

    registerUser: function(username, password) {
        return new Promise((resolve, reject) =>{
            APIService.post('user', {username: username, password: password}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserInfo: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('user', { username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserPositions: function() {
        return new Promise((resolve, reject) =>{
            APIService.get('position-list', { username: UserService.username}).then(res =>{
                UserService.positions = res
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserFeed: function() {
        return new Promise((resolve, reject) =>{
            APIService.get('feed', { username: UserService.username}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    addFollower: function(username_to_follow) {
        return new Promise((resolve, reject) =>{
            APIService.post('follow', {username: UserService.username, username_to_follow: username_to_follow}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserFollowing: function() {
        return new Promise((resolve, reject) =>{
            APIService.get('follow', {username: UserService.username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    }
};

export default UserService;
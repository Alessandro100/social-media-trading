import APIService from "./api";

const UserService = {

    username: null,
    img: 'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
    bgImg: 'https://www.designyourway.net/blog/wp-content/uploads/2018/06/Seamless-Polygon-Background.jpg',
    investorScore: 0,
    freeCash: 0, //when this value is used, it should always be fresh from alpaca
    positions: [],

    updateUserInfo(params, access_token) {
        params['access_token'] = access_token;
        return new Promise((resolve, reject) =>{
            APIService.put('user', params).then(user =>{
                UserService.setUserInfo(user['data']);
                resolve(user['data']);
            }, err =>{
                reject(err);
            })
        }) 
    },

    setUserInfo: function(user) {
        UserService.username = user.username;
        UserService.img = user.img;
        UserService.bgImg = user.bgImg;
        UserService.investorScore = user.investorScore;
        UserService.freeCash = user.freeCash;
    },

    login: function(username, password) {
        return new Promise((resolve, reject) =>{
            APIService.get('authenticate', {username: username, password: password}).then(user =>{
                UserService.setUserInfo(user['data']);
                resolve(user['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    logout: function(){
        const resetUser = {username: null, img: null, bgImg: null, investorScore: null, freeCash: null}
        this.setUserInfo(resetUser);
        localStorage.setItem('access_token', null)
    },

    loginAccessToken: function(access_token) {
        return new Promise((resolve, reject) =>{
            APIService.get('access-token-authenticate', {access_token: access_token}).then(user =>{
                UserService.setUserInfo(user['data']);
                resolve(user['data']);
            }, err =>{
                reject(err);
            })
        })
    },

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
import APIService from "./api";

const AlpacaService = {
    registerAlpaca: function(code) {
        return new Promise((resolve, reject) =>{
            APIService.post('alpaca-registration', {code: code}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    buySellStock: function(username, stockSymbol, action, quantity) {
        return new Promise((resolve, reject) =>{
            var params ={
                username: username,
                symbol: stockSymbol,
                action: action, //'buy' or 'sell'
                quantity: quantity
            }
            APIService.post('alpaca-transaction', params).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserPositions: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('alpaca-positions', {username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        });
    },
    
    getAndUpdateUsersAlpacaAccount: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('update-and-get-alpaca-account', {username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    getUserTimeline: function(username) {
        return new Promise((resolve, reject) =>{
            console.log('TIMELINE')
            APIService.get('alpaca-timeline', {username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    }
};

export default AlpacaService;
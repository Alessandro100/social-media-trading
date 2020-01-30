import APIService from "./api";

const AlpacaService = {
    registerAlpaca: function(username, code) {
        return new Promise((resolve, reject) =>{
            APIService.post('alpaca-registration', {username: username, code: code}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    },

    buySellStock: function(username, stockSymbol, action, quantity) {
        return new Promise((resolve, reject) =>{
            var params ={
                username: this.USERNAME,
                symbol: stockSymbol,
                action: action, //'buy' or 'sell'
                quantity: quantity
            }
            APIService.post('alpaca-transaction', params).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
    }
};

export default AlpacaService;
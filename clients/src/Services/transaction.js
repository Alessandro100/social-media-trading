import APIService from "./api";
import UserService from "./user";

const TransactionService = {
    getUserTransactions: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('transaction-list', { username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    },
    getTransactionFeed: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('feed', { username: username}).then(res =>{
                resolve(res['data']);
            }, err =>{
                reject(err);
            })
        })
    }
};

export default TransactionService;
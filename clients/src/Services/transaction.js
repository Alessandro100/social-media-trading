import APIService from "./api";

const TransactionService = {
    getUserTransactions: function(username) {
        return new Promise((resolve, reject) =>{
            APIService.get('transaction-list', { username: username}).then(res =>{
                resolve(res);
            }, err =>{
                reject(err);
            })
        })
        
    },
};

export default TransactionService;
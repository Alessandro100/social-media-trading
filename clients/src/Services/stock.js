import APIService from "./api";
import UserService from "./user";

//const AMEX = require('../Assets/company-data/AMEXcompanies.json'); //temp removed 
const NASDAQ = require('../Assets/company-data/NASDAQcompanies.json');
const NYSE = require('../Assets/company-data/NYSEcompanies.json');

const StockService = {
    getStockList() {
        return NYSE.concat(NASDAQ);
    },
    getStockData(stockSymbol, username) {
        return new Promise((resolve, reject) =>{
            APIService.get('detail-stock-info', {stock_symbol: stockSymbol, username: username}).then(stockData =>{
                resolve(stockData['data']);
            }, err =>{
                reject(err);
            })
        })
    },

    getStockFinancialData(stockSymbol){
        return new Promise((resolve, reject) =>{
            APIService.get('financial-stock-info', {stock_symbol: stockSymbol}).then(stockData =>{
                resolve(stockData['data']);
            }, err =>{
                reject(err);
            })
        })
    }
}

export default StockService;
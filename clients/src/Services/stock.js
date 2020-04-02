import APIService from "./api";

const StockService = {
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
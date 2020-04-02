import React, { Component } from 'react'
import Header from './Header'
import StockInfoGraph from './StockInfoGraph'
import ItemList from './Item/ItemList'
import StockService from '../Services/stock';
import UserService from '../Services/user';
import AlpacaService from '../Services/alpaca';
import StockItemList from './Item/StockItemList';
import BuySellStock from './BuySellStock/BuySellStock';

export class StockInfoPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            followerWhoOwn: [],
            topInvestorsWhoOwn: [],
            otherStocksPeopleOwn: [],
            companyName: null,
            currentPrice: null,
            percentChange: null,
            cashAvailable: 0,
        }

        this.loadStockData();
        this.loadUserBuyingPower();
    }

    loadStockData() {
        const {stockSymbol} = this.props;

        StockService.getStockData(stockSymbol, UserService.username).then(info =>{
            this.setState({followerWhoOwn: info.follower_who_own, topInvestorsWhoOwn: info.top_investors_with_stock, otherStocksPeopleOwn: info.people_also_own})
        })

        StockService.getStockFinancialData(stockSymbol).then(info =>{
            console.log("Stock Information");
            console.log(info);
            this.setState({companyName: info.companyName, currentPrice: info.latestPrice, percentChange: info.changePercent * 100})
        })
    }

    loadUserBuyingPower() {
        AlpacaService.getAndUpdateUsersAlpacaAccount(UserService.username).then(data =>{
            console.log("This is the user's account info");
            console.log(data)
            this.setState({cashAvailable: data['cash']})
        })
    }

    render() {
        const {followerWhoOwn, topInvestorsWhoOwn, otherStocksPeopleOwn, companyName, currentPrice, percentChange, cashAvailable} = this.state;
        const {stockSymbol} = this.props;
        
        return (
            <>
                <Header />
                <div className='page-container'>
                    <div className='page-main'>
                        <h1>{companyName}</h1>
                        <h3>{stockSymbol}</h3>
                        <div>
                            Price(USD): {currentPrice}$ ({percentChange}%)
                        </div>
                        <StockInfoGraph />
                    </div>
                    <div className='page-sidebar'>
                        {/* probably should be a seperate componenet */}
                        <BuySellStock stockSymbol={stockSymbol} tradingPrice={currentPrice} cashAvailable={cashAvailable}/>
                        <div>
                            <h2>Portfolio</h2>
                            <div>**Display stats of apple Portfolio here**</div>
                        </div>
                    </div>
                </div>
                <div className='stockinfo-container'>
                    <div className='stockinfo-card'>
                        <ItemList itemList={followerWhoOwn} headerTitle='Followers Who Own' />
                    </div>
                    <div className='stockinfo-card'>
                        <ItemList itemList={topInvestorsWhoOwn} headerTitle='Top Investors' />
                    </div>
                    <div className='stockinfo-card'>
                        <StockItemList stockList={otherStocksPeopleOwn} headerTitle='People Also Own'/>
                    </div>
                </div>
            </>
        )
    }
}

export default StockInfoPage

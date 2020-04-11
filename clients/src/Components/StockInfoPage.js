import React, { Component } from 'react'
import Header from './Header'
import StockInfoGraph from './StockInfoGraph'
import ItemList from './Item/ItemList'
import StockService from '../Services/stock';
import UserService from '../Services/user';
import AlpacaService from '../Services/alpaca';
import StockItemList from './Item/StockItemList';
import BuySellStock from './BuySellStock/BuySellStock';
import Position from './Position/Position';

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
            position: null,
        }

        this.loadStockData();
        this.loadUserBuyingPower();
        this.loadPosition();
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

    loadPosition() {
        const {stockSymbol} = this.props;
        AlpacaService.getUserPositions(UserService.username).then(positions =>{
            if(positions['message'] && positions['message'] === "no positions") {
                this.setState({position: null});
            } else {
                const position = positions.find(p => p.symbol === stockSymbol);
                this.setState({position: position});
            }
        })
    }

    render() {
        const {followerWhoOwn, topInvestorsWhoOwn, otherStocksPeopleOwn, companyName, currentPrice, percentChange, cashAvailable, position} = this.state;
        const {stockSymbol} = this.props;
        
        return (
            <>
                <Header />
                <div className='page-container'>
                    <div className='page-main'>
                        <div className='stockinfo-header'>
                            <div style={{'margin-left': '25px'}}>
                                <h1>{companyName}</h1>
                                <h3>{stockSymbol}</h3>
                                <div>
                                    Price(USD): {currentPrice}$ ({Number(percentChange).toFixed(2)}%)
                                </div>
                            </div>
                            <div>
                                {position && (
                                    <Position position={position}/>
                                )}
                                {!position && (
                                    <div>You currently don't own any {stockSymbol}</div>
                                )}
                            </div>
                        </div>
                        
                        <StockInfoGraph stockSymbol={this.props.stockSymbol}/>
                    </div>
                    <div className='page-sidebar'>
                        <BuySellStock stockSymbol={stockSymbol} tradingPrice={currentPrice} cashAvailable={cashAvailable} hasPosition={position}/>
                    </div>
                </div>
                <div className='stockinfo-container'>
                    <div className='stockinfo-card'>
                        <ItemList itemList={followerWhoOwn} headerTitle='Followers Who Own' displayOnly={true}/>
                    </div>
                    <div className='stockinfo-card'>
                        <ItemList itemList={topInvestorsWhoOwn} headerTitle='Top Investors Who Own' displayOnly={true}/>
                    </div>
                    <div className='stockinfo-card'>
                        <StockItemList stockList={otherStocksPeopleOwn} headerTitle='People Also Own' displayOnly={true}/>
                    </div>
                </div>
            </>
        )
    }
}

export default StockInfoPage

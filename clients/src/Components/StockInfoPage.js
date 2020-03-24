import React, { Component } from 'react'
import Header from './Header'
import StockInfoGraph from './StockInfoGraph'
import ItemList from './Item/ItemList'
import StockService from '../Services/stock';
import UserService from '../Services/user';
import StockItemList from './Item/StockItemList';

export class StockInfoPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            followerWhoOwn: [],
            topInvestorsWhoOwn: [],
            otherStocksPeopleOwn: []
        }

        this.loadStockData();
    }

    loadStockData(){
        const {stockSymbol} = this.props;

        StockService.getStockData(stockSymbol, UserService.username).then(info =>{
            this.setState({followerWhoOwn: info.follower_who_own, topInvestorsWhoOwn: info.top_investors_with_stock, otherStocksPeopleOwn: info.people_also_own})
        })
    }

    render() {
        const {followerWhoOwn, topInvestorsWhoOwn, otherStocksPeopleOwn} = this.state;
        
        return (
            <>
                <Header />
                <div className='page-container'>
                    <div className='page-main'>
                        <h1>Apple</h1>
                        <h3>AAPL</h3>
                        <div>
                            Price(CAD): 120(5%)
                        </div>
                        <StockInfoGraph />
                    </div>
                    <div className='page-sidebar'>
                        sidebar
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

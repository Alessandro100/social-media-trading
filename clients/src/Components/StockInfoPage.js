import React, { Component } from 'react'
import Header from './Header'
import StockInfoGraph from './StockInfoGraph'
import ItemList from './ItemList'

export class StockInfoPage extends Component {
    render() {
        const { positions, transactions, followers } = this.props.state
        console.log('stock info')
        console.log(positions)
        console.log(transactions)
        console.log(followers)
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
                        <ItemList itemList={followers} header='Followers' />
                    </div>
                    <div className='stockinfo-card'>
                        <ItemList itemList={followers} header='Top Investors' />
                    </div>
                    <div className='stockinfo-card'>
                        <ItemList itemList={followers} header='People who own Apple Stock' />
                    </div>
                </div>
            </>
        )
    }
}

export default StockInfoPage

import React, { Component } from 'react'
import './item.scss'


 class StockItemList extends Component {
    render() {
        const {stockList, headerTitle} = this.props;

        console.log("hey ssosss")
        console.log(stockList);

        return (
            <div> 
                <h3>{headerTitle}</h3>
                    <div className="item-list-style hover">
                        {stockList.map((stock) => (
                            <div className="item-style" >
                            <a href={"/stockinfo/"+stock['symbol']}>
                                {stock['name']}
                            </a>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default StockItemList
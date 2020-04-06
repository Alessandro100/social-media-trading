import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './item.scss'


 class StockItemList extends Component {
    render() {
        const {stockList, headerTitle} = this.props;

        return (
            <div> 
                <h3>{headerTitle}</h3>
                    <div className="item-list-style hover">
                        {stockList.map((stock) => (
                            <div className="item-style" >
                                <Link to={"/stockinfo/"+stock['symbol']}>{stock['name']}</Link>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default StockItemList
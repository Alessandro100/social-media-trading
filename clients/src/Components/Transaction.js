import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Transaction extends Component {

    render() {
        const { transaction } = this.props
        var stock_string = "stock";
        console.log(transaction)
        var action_readable = transaction.action;
        if (transaction.quantity > 1) {
            stock_string = stock_string.concat('s')
        }
        if (transaction.action === "buy") {
            action_readable = "bought";
        }
        /**TODO: Style + format date */
        
        return (
            <div className='box box-transaction'>
                <Link to={"/stockInfo/"+transaction.stock.symbol}>
                    <h4>
                        {transaction.stock.symbol}
                    </h4>
                </Link>
                <div className="box-transaction-info">
                    <Link to={'/profile/' + transaction.username}>{transaction.username}<i className="fa fas-search"></i></Link>&nbsp;
                    {action_readable} {transaction.quantity} {stock_string} of {transaction.stock.name}
                    <div>{new Date(transaction.date).toLocaleDateString("en-US")}</div>
                </div>
            </div>
        )
    }
}

export default Transaction

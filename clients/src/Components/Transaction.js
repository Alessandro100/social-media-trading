import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Transaction extends Component {

    render() {
        const { transaction } = this.props
        /**TODO: Style + format date */
        
        return (
            <div className='box'>
                <div>
                    <Link to={'/profile/' + transaction.username}>{transaction.username}</Link> &nbsp;
                    {transaction.action} {transaction.quantity} stocks of {transaction.stock.name}
                    <div>{new Date(transaction.date).toLocaleDateString("en-US")}</div>
                </div>
            </div>
        )
    }
}

export default Transaction

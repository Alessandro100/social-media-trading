import React, { Component } from 'react'

export class Transaction extends Component {

    render() {
        const { transaction } = this.props
        /**TODO: Style + format date */
        
        return (
            <div className='box'>
                <div>
                    {transaction.username} {transaction.action} {transaction.quantity} stocks of {transaction.stock.name}
                    <div>{new Date(transaction.date).toLocaleDateString("en-US")}</div>
                </div>
            </div>
        )
    }
}

export default Transaction

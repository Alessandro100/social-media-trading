import React, { Component } from 'react'

export class Transaction extends Component {

    render() {
        const { user, transactionType, amount, stock } = this.props.transaction
        return (
            <div className='transaction'>
                <div>{user} {transactionType} {amount} stocks of {stock}</div>
            </div>
        )
    }
}

export default Transaction

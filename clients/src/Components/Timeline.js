import React, { Component } from 'react'
import Transaction from './Transaction'


export class Timeline extends Component {
    render() {
        const {transactions} = this.props;
        return (
            transactions.map(transaction => (
                <Transaction transaction={transaction} />
            ))
        )
    }
}

export default Timeline

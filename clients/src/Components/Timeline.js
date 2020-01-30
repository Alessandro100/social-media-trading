import React, { Component } from 'react'
import Transaction from './Transaction'


export class Timeline extends Component {
    render() {
        return this.props.transactions.map(transaction => (
            <Transaction 
            key={transaction.id} 
            transaction={transaction} />
        ))
    }
}

export default Timeline

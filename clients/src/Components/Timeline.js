import React, { Component } from 'react'
import Transaction from './Transaction'


export class Timeline extends Component {
    render() {
        const {transactions} = this.props;
        console.log("IM IN TIMELINE");
        console.log(transactions);

        return (
            transactions.map(transaction => (
                <Transaction transaction={transaction} />
            ))
        )
    }
}

export default Timeline

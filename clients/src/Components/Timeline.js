import React, { Component } from 'react'
import Transaction from './Transaction'


export class Timeline extends Component {

    compare( a, b ) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if ( dateA.getTime() > dateB.getTime() ){
          return -1;
        }
        if ( dateA.getTime() < dateB.getTime() ){
          return 1;
        }
        return 0;
    }

    render() {
        const {transactions} = this.props;

        transactions.sort( this.compare );
        return (
            transactions.map(transaction => (
                <Transaction transaction={transaction} />
            ))
        )
    }
}

export default Timeline

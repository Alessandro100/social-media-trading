import React, { Component } from 'react'
import './position.scss';

export class Position extends Component {
    render() {
        const { position } = this.props;
        
        const initialCost = (Number(position.qty) * Number(position.avg_entry_price)).toFixed(2);
        const currentValue = (Number(position.qty) * Number(position.current_price)).toFixed(2);
        const profit = currentValue - initialCost;

        console.log("POSITNITNTINTITNITT");
        console.log(position);

        return (
            <div className='box'>
                <div className='position-row'>
                    <div>
                        <a href={"/stockinfo/"+position.symbol}>{position.symbol}</a>
                    </div>
                </div>
                <div className='position-row'>
                    <div>Value: {currentValue}$</div>
                    <div>Profit: {profit.toFixed(2)}$</div>
                </div>
            </div>
        )
    }
}

export default Position

import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './position.scss';

export class Position extends Component {
    render() {
        const { position } = this.props;
        
        const initialCost = (Number(position.qty) * Number(position.avg_entry_price)).toFixed(2);
        const currentValue = (Number(position.qty) * Number(position.current_price)).toFixed(2);
        const profit = currentValue - initialCost;

        return (
            <div className='box'>
                <div className='position-row'>
                    <div>
                        <Link to={"/stockinfo/"+position.symbol}>{position.symbol}</Link>
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

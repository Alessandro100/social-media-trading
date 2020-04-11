import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './position.scss';
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

export class Position extends Component {
    render() {
        const { position } = this.props;
        
        const initialCost = (Number(position.qty) * Number(position.avg_entry_price)).toFixed(2);
        const currentValue = (Number(position.qty) * Number(position.current_price)).toFixed(2);
        const profit = currentValue - initialCost;

        return (
            <div className='box box-position'>
                <div className='position-row position-row-title'>
                    <div className="position-title">
                        <Link to={"/stockinfo/"+position.symbol}>{position.symbol}</Link>
                    </div>
                </div>
                <div className='position-row'>
                    <div className="position-info">Value: {currentValue}$</div>
                    <div className="position-info">Profit: {profit.toFixed(2)}$</div>
                    <div className="position-info">Quantity: {position.qty}</div>
                </div>
                <div className="position-row position-row-arrow">
                    {(profit.toFixed(2) > 0) &&
                    <div className="profit-up"><FaArrowCircleUp/></div>}
                    {(profit.toFixed(2) < 0) &&
                    <div className="profit-down"><FaArrowCircleDown/></div>}
                </div>
            </div>
        )
    }
}

export default Position

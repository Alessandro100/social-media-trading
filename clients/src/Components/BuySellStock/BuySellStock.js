import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import AlpacaService from '../../Services/alpaca';
import UserService from '../../Services/user';
import 'react-dropdown/style.css';
import './buy-sell-stock.scss';


const orderTypeOptions = ['Market'];
const timeInForceOptions = ['Day'];

class BuySellStock extends Component {

    constructor(props) {
        super(props);

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }

    /***
     * What information do I need?
     * Stock Symbol
     * Current Trading price
     */

    state = {
        action: 'buy',
        quantity: 0,
        showBannerMessage: false,
        showConfirmMessage: false
    }

    submitOrder() {
        const {action, quantity} = this.state;
        const {stockSymbol} = this.props

        console.log("submit order");
        AlpacaService.buySellStock(UserService.username, stockSymbol, action, quantity).then(res =>{
            console.log("ORDER SUCCESS!");
            console.log(res);
            this.setState({showBannerMessage: true})
            //display a message on the screen that the order was successful!
        }, err =>{
            console.log(err);
        })
    }

    handleQuantityChange(event) {
        this.setState({quantity: event.target.value});
    }

    render(){
        const {quantity, action, showBannerMessage, showConfirmMessage} = this.state;
        const {stockSymbol, tradingPrice, cashAvailable} = this.props;

        return(
            <div className="buy-sell-stock">
                <h2>{stockSymbol}</h2>
                <div className='button-holder'>
                    <button className={action === 'buy' ? 'active' : null} onClick={()=>this.setState({action: 'buy'})}>Buy</button>
                    <button className={action === 'sell' ? 'active' : null} onClick={()=>this.setState({action: 'sell'})}>Sell</button>
                </div>
                <div>
                    <div>Market Price</div>
                    <div>{tradingPrice}$</div>
                </div>
                <div>
                    <label>Order Type</label>
                    <Dropdown options={orderTypeOptions} value={orderTypeOptions[0]} placeholder="Select an order type" />
                </div>
                <div>
                    <label>Time in Force</label>
                    <Dropdown options={timeInForceOptions} value={timeInForceOptions[0]} placeholder="Select an contract length" />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type='number' name='qty' min="0" step="1" value={quantity} onChange={this.handleQuantityChange}></input>
                </div>
                <div className='inline-elements'>
                    <label>Cash Available</label>
                    <div>{cashAvailable}$</div>
                </div>
                <div className='inline-elements'>
                    <label>Estimated <b className='action'>{action}</b> Price:</label>
                    <div>{quantity * tradingPrice}$</div>
                </div>
                <div className='inline-elements'>
                    <label>Estimated Remaining Balance</label>
                    <div>{cashAvailable - (quantity * tradingPrice)}$</div>
                </div>
                <div className='action-button-container'>
                    <button className={showConfirmMessage ? 'button-lrg primary hide' : 'button-lrg primary'} onClick={()=>{this.setState({showConfirmMessage: true})}}>Review Order</button>
                    <button className={!showConfirmMessage ? 'button-lrg primary hide' : 'button-lrg primary'} onClick={()=>{this.setState({showConfirmMessage: false})}}>Edit</button>
                    <button className={!showConfirmMessage ? 'button-lrg action hide' : 'button-lrg action'} onClick={()=>this.submitOrder()}>Confirm Order</button>
                </div>
                {showBannerMessage && (<h4>Your order to {action} {quantity} {stockSymbol} stocks has been placed!</h4>)}
            </div>
        )
    }
}

export default BuySellStock;
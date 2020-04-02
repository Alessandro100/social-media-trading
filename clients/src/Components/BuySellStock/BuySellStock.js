import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import AlpacaService from '../../Services/alpaca';
import UserService from '../../Services/user';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import 'react-dropdown/style.css';
import './buy-sell-stock.scss';


const orderTypeOptions = ['Market'];
const timeInForceOptions = ['Day'];

class BuySellStock extends Component {

    constructor(props) {
        super(props);

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        showConfirmMessage: false,
        isLoading: false
    }

    submitOrder() {
        const {action, quantity} = this.state;
        const {stockSymbol} = this.props

        this.setState({isLoading: true});
        AlpacaService.buySellStock(UserService.username, stockSymbol, action, quantity).then(res =>{
            console.log("ORDER SUCCESS!");
            console.log(res);
            this.setState({showBannerMessage: true, isLoading: false})
        }, err =>{
            this.setState({isLoading: false})
        })
    }

    handleQuantityChange(event) {
        this.setState({quantity: event.target.value});
    }

    closeModal = () => {
        this.setState({showBannerMessage: false, showConfirmMessage: false, quantity: 0})
    }

    render(){
        const {quantity, action, showBannerMessage, showConfirmMessage, isLoading} = this.state;
        const {stockSymbol, tradingPrice, cashAvailable, hasPosition} = this.props;

        return(
            <div className="buy-sell-stock">
                <h2>{stockSymbol}</h2>
                <div className='button-holder'>
                    <button className={action === 'buy' ? 'active' : null} onClick={()=>this.setState({action: 'buy'})}>Buy</button>
                    <button disabled={!hasPosition} className={action === 'sell' ? 'active' : null} onClick={()=>this.setState({action: 'sell'})}>Sell</button>
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
                    <div>{(quantity * tradingPrice).toFixed(2)}$</div>
                </div>
                <div className='inline-elements'>
                    <label>Estimated Remaining Balance</label>
                    <div>{(cashAvailable - (quantity * tradingPrice)).toFixed(2)}$</div>
                </div>
                {isLoading && <CircularProgress className="buy-loader" />}
                <div className='action-button-container'>
                    <button disabled={quantity == 0} className={showConfirmMessage ? 'button-lrg primary hide' : 'button-lrg primary'} onClick={()=>{this.setState({showConfirmMessage: true})}}>Review Order</button>
                    <button className={!showConfirmMessage ? 'button-lrg primary hide' : 'button-lrg action'} onClick={()=>{this.setState({showConfirmMessage: false})}}>Edit</button>
                    <button disabled={isLoading} className={!showConfirmMessage ? 'button-lrg action hide' : 'button-lrg primary'} onClick={()=>this.submitOrder()}>Confirm Order</button>
                </div>

                <Modal
                    open={showBannerMessage}
                    onClose={this.closeModal}>
                    <div className="add-follower-modal">
                        <div className="add-follower-title">
                            <h2>Success!</h2>
                        </div>
                        <div className="add-follower-modal-body">
                            <div className="follower-search-holder">
                                Your order to {action} {quantity} {stockSymbol} stocks has been placed!
                            </div>
                            <Button className="ok-button" onClick={()=> this.closeModal()}>Ok</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default BuySellStock;
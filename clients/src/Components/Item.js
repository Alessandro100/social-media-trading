import React, { Component } from 'react'
import propTypes from 'prop-types';
import './Item.css';
import aless from '../Logos/aless.png'

export default class Item extends Component {
    render() {
        const {name} = this.props.item;
        const {img} = this.props.item;

        return (
            <div className="itemStyle" >
               <a><img className="itemIMG" src='../Logos/aless.png' />  {name}</a>
            </div>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
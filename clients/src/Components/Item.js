import React, { Component } from 'react'
import propTypes from 'prop-types';
import './Item.css';

export default class Item extends Component {
    render() {
        const { name} = this.props.item;
        return (
            <div className="itemStyle" >
                <a>{name}</a>
            </div>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
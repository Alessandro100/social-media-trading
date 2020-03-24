import React, { Component } from 'react'
import propTypes from 'prop-types';
import Item from './Item';
import './item.scss'


export default class ItemList extends Component {
    render() {
        const {itemList, headerTitle} = this.props;

        return (
            <div> 
                <h3>{headerTitle}</h3>
                    <div className="item-list-style hover">
                        {itemList.map((item) => (
                            <Item key={item.id} item={item} />
                        ))}
                    </div> 
            </div>
        )
    }
}

ItemList.propTypes = {
    itemList: propTypes.array.isRequired
}
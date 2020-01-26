import React, { Component } from 'react'
import propTypes from 'prop-types';
import Item from './Item';
import './ItemList.css'


export default class ItemList extends Component {



    render() {

        return (
            <div> 
                <h3>{this.props.header}</h3>
                {this.props.itemList.map((item) => (
                    <div className="itemListStyle hover">
                        <Item key={item.id} item={item} />
                    </div>
                
                ))}
        </div>
        )

    }
}

ItemList.propTypes = {
    itemList: propTypes.array.isRequired
}
import React, { Component } from 'react'
import propTypes from 'prop-types';
import './item.scss';

export default class Item extends Component {
    render() {
        const {name} = this.props.item;
        const {img} = this.props.item;

        console.log('name, img')
        console.log(name)
        console.log(img)
        return (
            <div className="item-style" >
               <a>
                   <img className="item-img" src='https://www.w3schools.com/w3images/avatar2.png' />
                   {name}
                </a>
            </div>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
import React, { Component } from 'react'
import propTypes from 'prop-types';
import './item.scss';

export default class Item extends Component {
    render() {
        const {item} = this.props;

        const img = item.img ? item.img : 'https://www.w3schools.com/w3images/avatar2.png';

        return (
            <div className="item-style" >
               <a href={"/profile/"+item.username}>
                   <img className="item-img" src={img} />
                   {item.username}
                </a>
            </div>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
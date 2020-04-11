import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import './item.scss';

export default class Item extends Component {
    render() {
        const {item} = this.props;

        const img = item.img ? item.img : 'https://www.w3schools.com/w3images/avatar2.png';

        return (
            <Link to={"/profile/"+item.username}>
                <div className="item-style" >
                        <img className="item-img" src={img} />
                        {item.username}
                </div>
            </Link>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
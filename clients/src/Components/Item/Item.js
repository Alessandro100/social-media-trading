import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import './item.scss';

export default class Item extends Component {
    render() {
        const {item} = this.props;

        const img = item.img ? item.img : 'https://www.w3schools.com/w3images/avatar2.png';

        return (
            <div className="item-style" >
                <Link to={"/profile/"+item.username}>
                    <img className="item-img" src={img} />
                    {item.username}
                </Link>
            </div>
        )
    }
}


Item.propTypes = {
    item: propTypes.object.isRequired
}
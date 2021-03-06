import React, { Component } from 'react'
import propTypes from 'prop-types';
import Item from './Item';
import './item.scss'
import '../../App.scss'
import Button from '@material-ui/core/Button'


export default class ItemList extends Component {
    render() {
        const {itemList, headerTitle, displayOnly } = this.props;
        return (
            <div className="home-card"> 
                <h3>{headerTitle}</h3>
                { (itemList && itemList.length !== 0 ) ? 
                    <div className="feed-box">
                        <div className="item-list-style hover">
                            {itemList.map((item) => (
                                <Item key={item.id} item={item} />
                            ))}
                        </div> 
                        {!displayOnly && <Button onClick={this.props.viewAddFollower}>Find Users</Button>}
                    </div>
                :   
                    <div className="empty-item-list">
                        <p className="home-card-subtitle">Looks like you're not following anyone yet.</p>
                        {!displayOnly && <Button onClick={this.props.viewAddFollower}>Find Users</Button>}
                    </div>
                }
            </div>
        )
    }
}

ItemList.propTypes = {
    itemList: propTypes.array.isRequired
}
import React, { Component } from 'react'
import './position.scss';

export class Position extends Component {
    render() {
        const { abv, name, total, profit } = this.props.position
        return (
            <div className='box'>
                <div className='position-row'>
                    <div>{abv}</div>
                    <div>{name}</div>
                </div>
                <div className='position-row'>
                    <div>{total}</div>
                    <div>{profit}</div>
                </div>
            </div>
        )
    }
}

export default Position

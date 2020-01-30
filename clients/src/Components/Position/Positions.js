import React, { Component } from 'react'
import Position from './Position'
import './position.css';

export class Positions extends Component {
    render() {
        return (
            <div>
                <h3>Positions</h3>
                {this.props.positions.map(position => (
                    <Position key={position.id} position={position} />
                ))}
            </div>
        )
    }
}

export default Positions

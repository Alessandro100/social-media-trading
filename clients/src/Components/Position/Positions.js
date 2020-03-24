import React, { Component } from 'react'
import Position from './Position'
import './position.scss';

export class Positions extends Component {
    render() {
        const { positions } = this.props;

        return (
            <div>
                <h3>Positions</h3>
                {!positions && (
                    <div>No Positions</div>
                )}
                {positions && positions.map(position => (
                    <Position key={position.id} position={position} />
                ))}
            </div>
        )
    }
}

export default Positions

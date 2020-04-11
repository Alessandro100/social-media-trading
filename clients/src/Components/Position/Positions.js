import React, { Component } from 'react'
import Position from './Position'
import './position.scss';
import '../../App.scss';

export class Positions extends Component {
    render() {
        const { positions } = this.props;

        return (
            <div className="home-card">
                <h3>Positions</h3>
                <div className="feed-box">
                    {!positions && (
                        <div className="empty-item-list">
                            <p className="home-card-subtitle">No positions.</p>
                        </div>
                    )}
                    {positions && positions.map(position => (
                        <Position key={position.id} position={position} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Positions

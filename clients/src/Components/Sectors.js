import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart';



export default class Sectors extends Component {
    
    render() {
        const { title, value, color } = this.props.sectors
        return (
            <div>
                <PieChart data = {this.props.sectors}/>
            </div>
        )
    }
}

import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart';



export default class Sectors extends Component {

    render() {
        const { title, value, color } = this.props.sectors
        return (
            <div>
                <PieChart  data={this.props.sectors}
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    label
                    labelPosition={50}
                    labelStyle={{
                        fill: '#121212',
                        fontFamily: 'sans-serif',
                        fontSize: '5px'
                    }} />

            </div>
        )
    }
}

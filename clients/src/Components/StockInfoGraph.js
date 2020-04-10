import React, { Component } from 'react'
import '../App.scss'
import moment from 'moment';
import Chart from 'react-apexcharts';

export class StockInfoGraph extends Component {

    constructor(props){
        super(props);
        this.state = {
            options: {
                chart: {
                  id: "basic-bar"
                },
                title: {
                    text: 'Worth over Time',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '14px',
                      fontWeight:  'bold',
                      fontFamily:  undefined,
                      color:  '#263238'
                    },
                },
                xaxis: {
                  categories: []
                }
              },
            series: [
                {
                  name: "series-1",
                  data: [1, 2, 3, 4, 5]
                }
            ],
            timeLine: []
        }

        this.loadCompanyTimeseries();
    }

    loadCompanyTimeseries() {
        console.log('company timeseries')
    }

    render() {
        return (
            <div className='graph-container'>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="700"
                />
            </div>
        )
    }
}

export default StockInfoGraph

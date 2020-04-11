import React, { Component } from 'react'
import '../App.scss'
import Chart from 'react-apexcharts';
import AlpacaService from '../Services/alpaca';
import UserService from '../Services/user';
import moment from 'moment';

export class Graph extends Component {

    constructor(props){
        super(props);
        this.state = {
            options: {
                chart: {
                  id: "equity-graph"
                },
                xaxis: {
                  categories: []
                }
              },
            series: [
                {
                  name: "series-1",
                  data: []
                }
            ],
            timeLine: []
        }

        this.loadUserInfo();
        this.loadUserTimeseries();
    }

    loadUserInfo() {
        const {username} = this.props;

        UserService.getUserInfo(username).then(userInfo =>{
            this.setState({userInfo: userInfo});
        })
    }

    async loadUserTimeseries() {
        const {username} = this.props;
        console.log('load user timeseries')

        await AlpacaService.getUserTimeline(username).then(userTimeline => {
            this.setState({series: userTimeline.equity})
            var series = [{
                name: "Equity Series",
                data: userTimeline.equity
            }];
            var times = []
            for (var i=0; i<=userTimeline.timestamp.length; i++){
                var thisDate = new Date(userTimeline.timestamp[i]*1000)
                times.push(moment(thisDate).format("MMM Do YYYY"))
            }
            this.setState({
                options: {
                    chart: {
                      id: "equity-graph"
                    },
                    xaxis: {
                        type: 'category',
                        categories: times,
                        labels: {
                            format: 'dd/MM',
                        },
                        tickAmount: 6
                    },
                    title: {
                        text: 'Equity Over Time',
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
                    fill: {
                        type: 'gradient',
                        gradient: {
                          shadeIntensity: 1,
                          opacityFrom: 0.7,
                          opacityTo: 0.9,
                          stops: [0, 100]
                        }
                    },
                }
            })
            this.setState({series:series})
        
        })

        console.log(this.state.timeLine)
    }

    render() {
        return (
            <div className='graph-container'>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="600"
                />
            </div>
        )
    }
}

export default Graph

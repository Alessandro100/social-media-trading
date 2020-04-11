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
    }

    loadCompanyTimeseries() {
        var timeseries = JSON.parse(this.httpGetTimeseries());
        console.log(timeseries)
        var dates = []
        for(var i=0; i< timeseries.length; i++){
            console.log(timeseries[i].date)
            dates.push({x:timeseries[i].date, y:timeseries[i].open})
        }
        console.log(dates)
        var series = [{
            name: "Company Series",
            data: dates
        }];
        this.setState({series:series})
        this.setState({
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
              }
        })
    }

    httpGetTimeseries(theUrl, callback)
    {
        var URL = 'https://sandbox.iexapis.com/stable/stock/'+this.props.stockSymbol+'/chart/6M/?token=Tpk_6d7ce216f5fe43ddb3de9ef3259bb550'
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", URL, false ); // false for synchronous request
        xmlHttp.send( null );
        console.log(xmlHttp)
        return xmlHttp.response;
    }

    componentDidMount() {
        this.loadCompanyTimeseries()
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

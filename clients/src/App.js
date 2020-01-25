import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ItemList from './Components/ItemList'

class App extends Component {


  // hardcoding for the list
  state = {
    itemList: [
      {
        id: 1,
        name: 'Barf fur',
        type: 'follower'
      },
      {
        id: 2,
        name: 'Nick Blowsomeass',
        type: 'follower'
      },
      {
        id: 3,
        name: 'Al Exandro',
        type: 'follower'
      }
    ]
  }




  //console.log("api tests")
  //axios.get(`http://127.0.0.1:5000/`).then(res => {
    //    console.log("connection success")
      //  console.log(res);
  //})
  render(){
    console.log(this.state.itemList)
  return (
    <div className="App">
      <h1>Hello Friends</h1>
      <ItemList itemList = {this.state.itemList} />
    </div>
  );
}
}

export default App;

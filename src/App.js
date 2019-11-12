import React from 'react'
import './App.css'
import SideMenu from './components/side-menu/SideMenu'
import MapView from './components/views/map/MapView'
import ControlerView from './components/views/controler/ControlerView'
import getDroneList from './api-worker/RestApiWorker'
import startDroneStatus from './api-worker/WebsocketApiWorker'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drones: {},
      recentDroneID: -1,
    }
  }

  componentDidMount() {
    startDroneStatus()
    
    // window.setInterval(()=>{getDroneList()}, 1000)
  }

  render() {
    return(
      <div class='app-container'>

        <h1 style={{textAlign: "center", fontSize: "2vw"}}>WUThrust Ground Station</h1>

        <SideMenu
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          stateHandler={(state)=>{this.setState({recentDroneID: state})}}
          getDroneList={getDroneList}
        />

        <MapView
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          stateHandler={(state)=>{this.setState({recentDroneID: state})}}
        />

        <ControlerView />

      </div>
    )
  }
};
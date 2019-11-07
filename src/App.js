import React from 'react'
import './App.css'
import SideMenu from './components/side-menu/SideMenu'
import MapView from './components/views/map/MapView'
import ControlerView from './components/views/controler/ControlerView'
import RestApiWorker from './api-worker/RestApiWorker'
import WebsocketApiWorker from './api-worker/WebsocketApiWorker'

export default class App extends (React.Component, RestApiWorker, WebsocketApiWorker) {

  constructor() {
    super();
    this.state = {
      drones: {
        0: {
          "name": "noname drone",
          "lat": 52.221517, 
          "lon": 21.001470,
          "alt": 50.000,
          "hor": 0.000,
          "hdg": 130.123,
          "h_vel": 0.000,
          "v_vel": 0.000,
          "t_rssi": 0.000,
          "rc_rssi": 0.000,
          "current_mode": "no_drone",
          "arm_state": "disarmed",
          "mission state": "no_mission",
          "battery": 50,
        },
        1: {
          "name": "noname second drone",
          "lat": 52.225998,
          "lon": 21.008393,
          "alt": 120.000,
          "hor": 0.000,
          "hdg": 284.123,
          "h_vel": 0.000,
          "v_vel": 0.000,
          "t_rssi": 0.000,
          "rc_rssi": 0.000,
          "current_mode": "no_drone",
          "arm_state": "disarmed",
          "mission state": "no_mission",
          "battery": 75,
        },
      },
      recentDroneID: -1,
    }
    
  }

  getAPI() {
    fetch("http://127.0.0.1:5000/drone1", {
      mode: "no-cors",
      method: "GET",
      headers: {"Accept": "application/json"}
    })
    .then(res => {console.log(res); res.text()})
    .then(res => console.log(res))
  }

  componentDidMount() {
    //services (start API connections)
  }

  render() {
    return(
      <div class='app-container'>

        <h1 style={{textAlign: "center", fontSize: "2vw"}}>WUThrust Ground Station</h1>

        <SideMenu
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          stateHandler={(state)=>{this.setState({recentDroneID: state})}}
        />

        <MapView
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          stateHandler={(state)=>{this.setState({recentDroneID: state})}}
        />

        <ControlerView />

        <button onClick={this.getAPI}>UPDATE</button>

      </div>
    )
  }
};
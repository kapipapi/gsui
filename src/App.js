import React from 'react'
import './App.css'

import SideMenu from './components/side-menu/SideMenu'
import MapView from './components/views/map/MapView'

import io from "socket.io-client"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket_io: null,
      drones: {},
      recentDroneID: -1,
      centering: true,
    }
  }

  componentDidMount() {
    this.startDroneStatus();
    window.setInterval(()=>{this.getDroneList()}, 1000)
  }

  // REST API
  getDroneList = () => {
    
    if(this.state.socket_io && this.state.socket_io.disconnected) {
      this.state.socket_io.connect()
    }

    fetch("/drones", {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => {
      if (Number(res.status) !== 200) console.log("fetch errno " + res.status)
      else res.json()
    })
    .then(message => {
      let d = this.state.drones
      Object.keys(message.drones).map((key, val)=>{
        let id = val
        d[id]["name"] = message.drones[id]["connection_string"]
        return null
      })
      this.setState({drones: d})
    })
    .catch((e)=>{})
  }

  // WEBSOCKET
  startDroneStatus = () => {
    let socket = io('/drones')

    socket.on('connect', ()=>{
        console.log('connected')
        this.setState({socket_io: socket})
        socket.emit('subscribe', {"drone_id": 0})
    })
    
    socket.on('status', (message)=> {
      let id = message['drone_id']
      let d = this.state.drones

      if(!d[id]) {
        d[id] = {
          "drone_id": id,
          "name": "test #"+id,
          "lat": 0,
          "lon": 0,
          "alt": 0,
          "rel_alt": 0,
          "vx": 0,
          "vy": 0,
          "vz": 0,
          "velocity": 0,
          "hdg": 0,
          "autopilot": "",
          "mode": "",
          "sys_status": "",
          "voltage_battery": 0,
          "current_battery": 0,
          "battery_remaining": 0,
          "mission": {
            index: 0,
            waypoints: [],
          },
        }
      }

      Object.assign(d[id], message)

      this.setState({drones: d})
      if(Number(this.state.recentDroneID) === -1) this.setState({recentDroneID: id})
    })

    socket.on('disconnect', ()=>{
      console.log('disconnected')
      socket.connect()
    })
  }

  changeMission(id, mission) {
    let d = this.state.drones
    d[id].mission.index = mission.index
    d[id].mission.waypoints = mission.waypoints
    this.setState({drones: d})
  }

  render() {
    return(
      <div className='app-container'>

        <h1 style={{textAlign: "center", fontSize: "4vh", color:"#2F8565", margin: "0"}}>WUThrust Ground Station</h1>
        <h2 style={{textAlign: "center", fontSize: "2vh", color:"#2F8565", margin: "0"}}>Operating drone with id <u>{this.state.recentDroneID}</u></h2>

        <SideMenu
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          recentDroneIDHandler={state=>this.setState({recentDroneID: state})}
          getDroneListHandler={this.getDroneList}
          centering={this.state.centering}
          mapCenteringHandle={state=>this.setState({centering: state})}
        />

        <MapView
          drones={this.state.drones}
          recentDroneID={this.state.recentDroneID}
          recentDroneIDHandler={(state)=>{this.setState({recentDroneID: state})}}
          centering={this.state.centering}
          socket_io={this.state.socket_io}
          setCenteringState={(val)=>{this.setState({centering: val})}}
          changeMission={(index, mission)=>this.changeMission(index, mission)}
        />

      </div>
    )
  }
};
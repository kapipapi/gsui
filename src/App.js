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
      drones: {
        0: {
          "drone_id": 0,
          "name": "",
          "lat": 0,
          "lon": 0,
          "alt": 0,
          "rel_alt": 0,
          "vx": 0,
          "vy": 0,
          "vz": 0,
          "hdg": 0,
          "autopilot": "",
          "mode": "",
          "sys_status": "",
        }
      },
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
      if (res.status!=200) console.log("fetch errno " + res.status)
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

      d[id].lat = message.lat
      d[id].lon = message.lon

      d[id].alt = message.alt
      d[id].rel_alt = message.rel_alt

      d[id].vx = message.vx
      d[id].vy = message.vy
      d[id].vz = message.vz

      d[id].hdg = message.hdg

      d[id].autopilot = message.autopilot
      d[id].mode = message.mode
      d[id].sys_status = message.sys_status

      this.setState({drones: d, recentDroneID: id})
    })

    socket.on('disconnect', ()=>{
      console.log('disconnected')
      socket.connect()
    })
  }

  render() {
    return(
      <div class='app-container'>

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
        />

      </div>
    )
  }
};
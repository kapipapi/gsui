import React from "react"

export default class WaypointPannel extends React.Component {
    render(){
        return(<div class='waypoint-pannel'>
            <p style={{fontWeight: "900"}}>{this.props.id==0 ? "START" : this.props.id}</p>
            <p style={{fontSize: "10px"}}>lat: {this.props.position[0]}</p>
            <p style={{fontSize: "10px"}}>lon: {this.props.position[1]}</p>
            <p>ALTITUDE: {this.props.alt ? this.props.alt : "SET IT"}</p>
        </div>)
    }
}
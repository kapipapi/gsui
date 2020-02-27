import React from "react"
import Slider from 'rc-slider'

export default class WaypointPannel extends React.Component {

    constructor() {
        super();
        this.state = {
            speed: 10,
        }
    }

    render(){
        return(<div onClick={()=>{this.props.changeSelected()}} style={Number(this.props.id) === this.props.selected ? {border: "1px solid #2F8565"} : {border: "none"}} className='waypoint-pannel'>
            <p style={{fontWeight: "900"}}>{Number(this.props.id) === 0 ? "START" : this.props.id}</p>
            <p style={{fontSize: "10px"}}>lat: {this.props.position[0]}</p>
            <p style={{fontSize: "10px"}}>lon: {this.props.position[1]}</p>
            <p>ALTITUDE: {this.props.alt ? this.props.alt+" meters" : "GROUND!"}</p>
            <p style={{fontSize: "10px"}}>Speed: {this.props.speed}m/s</p>
            <Slider
                    min={0}
                    max={30}
                    step={0.1}
                    defaultValue={this.props.speed}
                    onChange={(val)=>{this.props.updateWaypointSpeed(this.props.id, val); this.setState({speed: val})}}
                />
        </div>)
    }
}
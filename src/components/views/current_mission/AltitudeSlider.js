import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './AltitudeSlider.css'

export default class UserControlMaker extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            height: 100,
        }
    }

    render() {
        return(<>
            <Slider
                style={{height:"2vh", marginBottom: "2vh"}}
                className="fixed_altitude_slider"
                min={0}
                max={250}
                step={0.5}
                defaultValue={100}
                onChange={(val)=>{this.props.updateWaypointAltitude(this.props.waypoint_id, val); this.setState({height: val})}}
                railStyle={{height:"100%", borderRadius: "0", backgroundColor: "white"}}
                trackStyle={{height:"100%", borderRadius: "0", backgroundColor:"lightblue"}}
                handleStyle={{height:"3vh", borderRadius: "0", backgroundColor: "black", border: "none", boxShadow: "none"}}
            />
        </>)
    }
}
import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './AltitudeSlider.css'

export default class UserControlMaker extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(<>
            <Slider
                className="fixed_altitude_slider"
                min={0}
                max={250}
                step={0.5}
                defaultValue={100}
                onChange={(val)=>{this.props.updateWaypointAltitude(this.props.waypoint_id, val)}}
            />
        </>)
    }
}
import React from 'react'
import './CurrentMissionView.css'
import WaypointPannel from './components/WaypointPannel'

import AltitudeSlider from './AltitudeSlider'

import ControlerView from '../controler/ControlerView'

export default class CurrentMissionView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: true,
            selected: 0,
        }

        this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
        this.state.show ? this.setState({show: false}) : this.setState({show: true}); 
    }

    sendMissionAction() {
        let mission_data = this.props.current_mission
        fetch("/drones/"+this.props.drone_id+"/mission", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify(mission_data)
        })
        .then(res => res.json())
        .then(message => {
            console.log(message.status)
        })
    }

    downloadMission() {
        fetch("/drones/"+this.props.drone_id+"/mission", {
            mode: "cors",
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(message => {
            let mission = JSON.parse(message.status)
            this.props.updateCurrentMissionHandler(mission)
        })
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (<>
                        <div class='current-mission-view'>
                            <ul class='horizontal-menu-mission-view'>
                                <li><div onClick={this.toggleShow}>&#10539;<br/>close</div></li>
                                <li><div onClick={()=>{this.props.updateCurrentMissionHandler({index: 0,waypoints: [],})}}>&#8709;<br/>clear</div></li>
                            </ul>
                            
                            <div className="waypoint_pannel_container">
                            {this.props.current_mission &&
                                Object.keys(this.props.current_mission.waypoints).map((key)=>{
                                    let waypoint = this.props.current_mission.waypoints[key]
                                    return(<>
                                        <WaypointPannel
                                            id={waypoint.id}
                                            position={[waypoint.lat, waypoint.lon]}
                                            alt={waypoint.alt}
                                            speed={waypoint.speed}
                                            selected={this.state.selected}
                                            changeSelected={()=>this.setState({selected: waypoint.id})}
                                            updateWaypointSpeed={this.props.updateWaypointSpeed}
                                        />
                                    </>)
                                })
                            }
                            <div className="download_mission_button" onClick={()=>this.downloadMission()}>DOWNLOAD CURRENT MISSION</div>
                            </div>
                            
                            {this.props.current_mission.index>0 &&
                            <>
                            <AltitudeSlider 
                                waypoint_id={this.state.selected}
                                updateWaypointAltitude = {this.props.updateWaypointAltitude}
                            />
                            <div className="start_button" onClick={()=>{this.sendMissionAction()}}>DEPLOY MISSION</div>
                            </>}

                            <ControlerView/>

                        </div></>
                    ) : (
                    <div class='current-mission-view-opener' onClick={this.toggleShow}></div>)
                }
            </>
        );
    }
};
import React from 'react'
import './CurrentMissionView.css'
import WaypointPannel from './components/WaypointPannel'

export default class CurrentMissionView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }

        this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
        this.state.show ? this.setState({show: false}) : this.setState({show: true}); 
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (<>
                        <div class='current-mission-view'>
                            <ul class='horizontal-menu-mission-view'>
                                <li><div onClick={this.toggleShow}>close</div></li>
                                <li><div onClick={()=>{
                                    this.props.updateCurrentMissionHandler({
                                        current_mission: {
                                           index: 0,
                                           waypoints: [],
                                        }
                                    })}}>clear</div></li>
                            </ul>
                            {this.props.current_mission &&
                                Object.keys(this.props.current_mission.waypoints).map((key)=>{
                                    let waypoint = this.props.current_mission.waypoints[key]
                                    return(
                                        <WaypointPannel
                                            id={waypoint.id}
                                            position={[waypoint.lat, waypoint.lon]}
                                            alt={waypoint.alt}
                                        />
                                    )
                                })
                            }
                        </div></>
                    ) : (
                    <div class='current-mission-view-opener' onClick={this.toggleShow}>
                        open Current Mission View
                    </div>)
                }
            </>
        );
    }
};
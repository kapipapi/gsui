import React from 'react'

export default class UserControlMaker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            go_to_status: "none",
        }
    }

    sendGoToAction() {
        this.setState({go_to_status: "sending..."})

        let go_to_data = {
            "lat": this.props.position[0],
            "lon": this.props.position[1],
        }

        fetch("/drones/"+this.props.drone_id+"/go-to", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify(go_to_data)
        })
        .then(res => res.json())
        .then(message => {
            this.setState({go_to_status: message.status})
        })
    }

    addWaypointToCurrentMission() {
        const waypoint = {
            "id": this.props.current_mission.index,
            "lat": this.props.position[0],
            "lon": this.props.position[1],
            "alt": this.props.default_altitude,
        }

        let waypoints_tmp = this.props.current_mission.waypoints
        waypoints_tmp.push(waypoint)

        const index_tmp = this.props.current_mission.index + 1

        const mission_tmp = {
            index: index_tmp,
            waypoints: waypoints_tmp,
        }

        this.props.updateCurrentMissionHandler(mission_tmp)
    }

    render() {
        return(<>
            <div>
                <p>{this.props.position[0]}, {this.props.position[1]}</p>
                <button style={{fontSize: "1.5vh",}} onClick={()=>{this.sendGoToAction()}}>&#9737;Go to</button>
                Status: {this.state.go_to_status}
                <hr/>
                <button style={{fontSize: "1.5vh",}} onClick={()=>{this.addWaypointToCurrentMission()}}> + Add waypoint to current mission</button>
            </div>
            </>
        )
    }
}
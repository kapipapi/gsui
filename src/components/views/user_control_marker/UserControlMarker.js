import React from 'react'

export default class UserControlMaker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            go_to_status: "none",
            current_mission: {
                index: 0,
                waypoints: [],
            },
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
        let waypoint = {
            "id": this.state.current_mission.index,
            "lat": this.props.position[0],
            "lon": this.props.position[1],
            "alt": undefined,
        }

        let waypoints_tmp = this.state.current_mission.waypoints
        waypoints_tmp.push(waypoint)

        this.setState({
            current_mission: {
                index: this.state.current_mission.index+1,
                waypoints: waypoints_tmp,
            }
        })

        this.props.updateCurrentMissionHandler(this.state.current_mission)
    }

    render() {
        return(
            <div>
                <button style={{fontSize: "1.5vh",}} onClick={()=>{this.sendGoToAction()}}>&#9737;Go to</button>
                Status: {this.state.go_to_status}
                <hr/>
                <button style={{fontSize: "1.5vh",}} onClick={()=>{this.addWaypointToCurrentMission()}}> + Add waypoint to current mission</button>
            </div>
        )
    }
}
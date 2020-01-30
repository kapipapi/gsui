import React from 'react'
import {Map, TileLayer, Popup, Marker, Polyline, CircleMarker} from 'react-leaflet'
import RotatedMarker from './RotatedMarker'
import L from 'leaflet'
import './MapView.css'
import 'leaflet/dist/leaflet.css'
import UserControlMaker from '../user_control_marker/UserControlMarker'
import CurrentMissionView from '../current_mission/CurrentMissionView'

const drone_icon = new L.Icon({
    iconUrl: require('./img/position_wuthrust.svg'),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const targer_icon = new L.Icon({
    iconUrl: require('./img/target.svg'),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

export default class MapView extends React.Component {

    constructor() {
        super()

        this.last_posision = [0,0]
        this.zoom = 15
        this.blockStatusUpdate = false

        this.state = {
            show: true,
            last_click: [0,0],
            path: {},
            current_mission: {
                index: 0,
                waypoints: [],
            },
            default_altitude: 100,
        }

        this.getWaypointPosition = this.getWaypointPosition.bind(this)
        this.getCurrentMission = this.getCurrentMission.bind(this)
        this.updateWaypointAltitude = this.updateWaypointAltitude.bind(this)
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    calculate_distance_meters(p1, p2) {
        var R = 6371000; // Radius of the earth in m
        var dLat = this.deg2rad(p2[0]-p1[0]);
        var dLon = this.deg2rad(p2[1]-p1[1]); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(p1[0])) * Math.cos(this.deg2rad(p2[0])) * Math.sin(dLon/2) * Math.sin(dLon/2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    componentDidUpdate() {
        // update path
        var waypointDistanceDifferance = 10 // in meters
        Object.keys(this.props.drones).map((key) => {
            let drone = this.props.drones[key]
            if(drone) {
                let id = drone.drone_id
                let recent_path = this.state.path[id]

                let new_path = [drone.lat, drone.lon]

                if(new_path[0] != 0 && new_path[1] != 0){
                    if(!recent_path){
                        recent_path = [new_path]
                        let tmp_path = this.state.path
                        tmp_path[id] = recent_path
                        this.setState({path: tmp_path})
                    } else {
                        let recent_path_len = recent_path.length
                        let last_point_path = recent_path[recent_path_len-1]
                        if(this.calculate_distance_meters(new_path, last_point_path) > waypointDistanceDifferance) {
                            let tmp_path = this.state.path
                            tmp_path[id].push(new_path)
                            this.setState({path: tmp_path})
                        }
                    }
                }
            }
        })
    }

    getMapCenter() {
        let center_drone = this.props.drones[this.props.recentDroneID]

        if (center_drone && this.props.centering) {
            this.last_posision = [center_drone.lat, center_drone.lon]
            return [center_drone.lat, center_drone.lon]
        } else {
            return this.last_posision
        }
    }

    getDronePosition(id) {
        if(!this.blockStatusUpdate){
            if(this.props.centering) this.last_posision = [this.props.drones[id].lat, this.props.drones[id].lon]
            return [this.props.drones[id].lat, this.props.drones[id].lon]
        } else {
            return this.last_posision
        }
    }

    getWaypointPosition(e) {
        this.setState({last_click: [e.latlng.lat, e.latlng.lng]})
    }

    getCurrentMission(mission) {
        this.setState({current_mission: mission})
    }

    getCurrentMissionPath(waypoints) {
        let path = []
        if (waypoints) {
            waypoints.forEach(val => {
                path.push(val)
            })
        }
        return path
    }

    updateWaypointAltitude(id, new_altitude) {
        let waypoint = this.state.current_mission.waypoints[id]
        waypoint.alt = new_altitude
        let waypoints_tmp = this.state.current_mission.waypoints
        waypoints_tmp[id] = waypoint
        this.setState({
            current_mission: {
                index: this.state.current_mission.index,
                waypoints: waypoints_tmp,
            },
            default_altitude: new_altitude,
        })
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (<>

                        {/* CURRENT MISSION VIEW TAB */}
                        <CurrentMissionView
                            drone_id={this.props.recentDroneID}
                            current_mission={this.state.current_mission}
                            updateCurrentMissionHandler={this.getCurrentMission}
                            updateWaypointAltitude={this.updateWaypointAltitude}
                        />

                        {/* MAP COMPONENT WITH MARKERS AND DRONE POSITION INITION */}
                        <Map 
                            center={this.getMapCenter()} 
                            zoom={17}
                            maxZoom={19}
                            onClick={this.getWaypointPosition}
                            zoomAnimation={true}
                            zoomControl={false}
                            ondragstart={()=>this.props.setCenteringState(false)}
                            onzoomstart={()=>this.props.setCenteringState(false)}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                            />

                            {Object.keys(this.props.drones).map((key)=>{
                                let drone = this.props.drones[key]
                                return(<>
                                    <RotatedMarker
                                        icon={drone_icon}
                                        position={this.getDronePosition(key)}
                                        rotationAngle={drone.hdg}
                                        rotationOrigin={'center'}
                                        onMouseOver={(e) => {e.target.openPopup()}}
                                        onMouseOut={(e) => {e.target.closePopup()}}
                                        onClick={() => {
                                                        this.props.recentDroneIDHandler(key);
                                                        this.props.setCenteringState(true);
                                                    }}
                                    >
                                        <Popup>
                                            <p>{key}. {drone.name}</p>
                                            <p>{drone.lat}, {drone.lon}</p>
                                            <p>hdg: {drone.hdg}</p>
                                            <p>{"Altitude: " + drone.alt + "m"}</p>
                                        </Popup>
                                    </RotatedMarker>
                                </>)
                            })}

                            {Object.keys(this.props.drones).map((key)=>{
                                let drone = this.props.drones[key]
                                if(this.state.path[drone.drone_id]) {
                                    var path_tmp = this.state.path[drone.drone_id].slice()
                                    path_tmp.push([drone.lat, drone.lon])
                                    return(
                                        <Polyline
                                            positions={ path_tmp }
                                        />
                                    )
                                }
                            })}

                            {/* DRAW MISSION PATH */}
                            {this.state.current_mission &&
                                <Polyline
                                    positions={this.getCurrentMissionPath(this.state.current_mission.waypoints)}
                                    color={"#2F8565"}
                                />
                            }

                            {/* DRAW MISSION MARKERS */}
                            {this.state.current_mission &&
                            Object.keys(this.state.current_mission.waypoints).map((key)=>{
                                let last_index = this.state.current_mission.waypoints.length
                                let waypoint = this.state.current_mission.waypoints[key]
                                return(
                                    <CircleMarker
                                        center={[waypoint.lat, waypoint.lon]}
                                        color={ key == 0 ? "green" : key == last_index-1 ? "red" : "orange" }
                                    >
                                        <Popup>
                                            <h1>{waypoint.id == 0 ? "START" : waypoint.id}</h1>
                                        </Popup>
                                    </CircleMarker>
                                )
                            })}

                            <Marker
                                icon={targer_icon}
                                position={this.state.last_click}
                                onMouseOver={(e) => {e.target.openPopup()}}
                            >
                                <Popup>
                                    <UserControlMaker
                                        drone_id={this.props.recentDroneID}
                                        position={this.state.last_click}
                                        current_mission={this.state.current_mission}
                                        updateCurrentMissionHandler={this.getCurrentMission}
                                        default_altitude={this.state.default_altitude}
                                    />
                                </Popup>
                            </Marker>

                        </Map>
                    </>) : (null)
                }
            </>
        )
    }
}
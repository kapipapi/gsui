import React from 'react'
import {Map, TileLayer, Popup, Marker} from 'react-leaflet'
import RotatedMarker from './RotatedMarker'
import L from 'leaflet'
import './MapView.css'
import 'leaflet/dist/leaflet.css'

const drone_icon = new L.Icon({
    iconUrl: require('./img/position.svg'),
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
        }

        this.getWaypointPosition = this.getWaypointPosition.bind(this)
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
        console.log(this.state.last_click)
        this.setState({last_click: [e.latlng.lat, e.latlng.lng]})
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (<>
                        <Map 
                            center={this.getMapCenter()} 
                            zoom={17}
                            maxZoom={19}
                            onClick={this.getWaypointPosition}
                            // onzoomstart={()=>{this.blockStatusUpdate = true}}
                            // onzoomend={()=>{this.blockStatusUpdate = false}}
                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {Object.keys(this.props.drones).map((key)=>{
                                let drone = this.props.drones[key]
                                return(
                                    <RotatedMarker
                                        icon={drone_icon}
                                        // position={[drone.lat,drone.lon]}
                                        position={this.getDronePosition(key)}
                                        rotationAngle={drone.hdg}
                                        rotationOrigin={'center'}
                                        onMouseOver={(e) => {e.target.openPopup()}}
                                        onMouseOut={(e) => {e.target.closePopup()}}
                                        onClick={() => {this.props.recentDroneIDHandler(key)}}
                                    >
                                        <Popup>
                                            <p>{key}. {drone.name}</p>
                                            <p>{drone.lat}, {drone.lon}</p>
                                            <p>hdg: {drone.hdg}</p>
                                            <p>{"Altitude: " + drone.alt + "m"}</p>
                                        </Popup>
                                    </RotatedMarker>
                                )
                            })}
                            <Marker
                                icon={targer_icon}
                                position={this.state.last_click}
                            >
                                <Popup>
                                    Test
                                </Popup>
                            </Marker>
                        </Map>
                    </>) : (null)
                }
            </>
        )
    }
}
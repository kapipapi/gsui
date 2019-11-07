import React from 'react'
import {Map, TileLayer, Popup} from 'react-leaflet'
import RotatedMarker from './RotatedMarker'
import L from 'leaflet'
import './MapView.css'
import 'leaflet/dist/leaflet.css'

const drone_icon = new L.Icon({
    iconUrl: require('./img/position.svg'),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

export default class MapView extends React.Component {

    constructor() {
        super()
        this.state = {
            show: true,

            centering: true,
            map_position: [52.221460, 21.007130],

            last_click: [],
        }
    }

    getMapCenter() {
        let center_drone = this.props.drones[this.props.recentDroneID]

        if (center_drone && this.state.centering) {
            return [center_drone.lat, center_drone.lon]
        } else {
            return this.state.map_position
        }
    }

    getWaypointPosition(e) {
        this.setState({last_click: e.latlng})
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (
                        <Map 
                            center={this.getMapCenter()} 
                            zoom={15}
                            onClick={this.getWaypointPosition}
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
                                        position={[drone.lat, drone.lon]}
                                        rotationAngle={drone.hdg}
                                        rotationOrigin={'center'}
                                        onMouseOver={(e) => {e.target.openPopup()}}
                                        onMouseOut={(e) => {e.target.closePopup()}}
                                        onClick={() => {this.props.stateHandler(key)}}
                                    >
                                        <Popup>
                                            <p>{key}. {drone.name}</p>
                                            <p>{drone.lat}, {drone.lon}</p>
                                            <p>{"Altitude: " + drone.alt + "m"}</p>
                                        </Popup>
                                    </RotatedMarker>
                                )
                            })}
                        </Map>
                    ) : (null)
                }
            </>
        )
    }
}
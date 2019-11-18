import React from 'react'
import StatusInfoBox from './components/StatusInfoBox'
import './StatusView.css'
// import ModeStatus from './components/ModeStatus'
// import StateInfoBox from './components/StateInfoBox'

export default class StatusView extends React.Component {
    constructor(props){
        super(props);
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
                    this.state.show ? (
                        <div class='status-view'>
                            {this.props.recentDroneID > -1 ? (
                            <>
                            <h3 style={{textAlign: 'center', margin: '.5vw 0 0 0', padding: 0}}>{this.props.drones[this.props.recentDroneID]['name']}</h3><br/>
                            <div class='status-info-grid'>
                                <StatusInfoBox name='lat' value={this.props.drones[this.props.recentDroneID]['lat']} unit='deg'/>
                                <StatusInfoBox name='lon' value={this.props.drones[this.props.recentDroneID]['lon']} unit='deg'/>

                                <StatusInfoBox name='alt' value={this.props.drones[this.props.recentDroneID]['alt']} unit='m'/>
                                {/* <StatusInfoBox name='relative alt' value={this.props.drones[this.props.recentDroneID]['rel_alt']} unit='m'/> */}
                                
                                <StatusInfoBox name='vx' value={this.props.drones[this.props.recentDroneID]['vx']} unit='m/s'/>
                                <StatusInfoBox name='vy' value={this.props.drones[this.props.recentDroneID]['vy']} unit='m/s'/>
                                <StatusInfoBox name='vz' value={this.props.drones[this.props.recentDroneID]['vz']} unit='m/s'/>

                                <StatusInfoBox name='battery temp' value={this.props.drones[this.props.recentDroneID]['battery_temp']} unit='&deg;C'/>
                                <StatusInfoBox name='battery voltage' value={this.props.drones[this.props.recentDroneID]['battery_voltage']} unit='VOLT'/>
                                <StatusInfoBox name='battery percent' value={this.props.drones[this.props.recentDroneID]['battery_percent']} unit='%'/>
                            </div>
                            </>) : (null)}
                        </div>
                    ) : (null)
                }
            </>
        )
    }
}
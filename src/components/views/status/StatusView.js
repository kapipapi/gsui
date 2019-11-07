import React from 'react'
import StatusInfoBox from './components/StatusInfoBox'
import './StatusView.css'
import ModeStatus from './components/ModeStatus';
import StateInfoBox from './components/StateInfoBox';

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
                                <StatusInfoBox  name='lat'       value={this.props.drones[this.props.recentDroneID]['lat']}           unit='deg'  />
                                <StatusInfoBox  name='lon'       value={this.props.drones[this.props.recentDroneID]['lon']}           unit='deg'  />
                                <StatusInfoBox  name='alt'       value={this.props.drones[this.props.recentDroneID]['alt']}           unit='m'    />

                                <StatusInfoBox  name='h_vel'     value={this.props.drones[this.props.recentDroneID]['h_vel']}         unit='m/s'  />
                                <ModeStatus     name='mode'      value={this.props.drones[this.props.recentDroneID]['current_mode']}              />
                                <StatusInfoBox  name='v_vel'     value={this.props.drones[this.props.recentDroneID]['v_vel']}         unit='m/s'  />

                                <StatusInfoBox  name='battery'   value={this.props.drones[this.props.recentDroneID]['battery']}       unit='%'    />
                                <StateInfoBox   name='arm_state' value={this.props.drones[this.props.recentDroneID]['arm_state']}                 />
                                <StateInfoBox   name='mission state'   value={this.props.drones[this.props.recentDroneID]['mission state']}       />
                            </div>
                            </>) : (null)}
                        </div>
                    ) : (null)
                }
            </>
        )
    }
}
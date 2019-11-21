import React from 'react'
import NumericBox from './components/NumericBox'
import TextBox from './components/TextBox'
import './StatusView.css'

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
                                <NumericBox name='lat' value={this.props.drones[this.props.recentDroneID]['lat']} unit='deg'/>
                                <NumericBox name='lon' value={this.props.drones[this.props.recentDroneID]['lon']} unit='deg'/>

                                {/* <NumericBox name='alt' value={this.props.drones[this.props.recentDroneID]['alt']} unit='m'/> */}
                                <NumericBox name='relative alt' value={this.props.drones[this.props.recentDroneID]['rel_alt']} unit='m'/>
                                
                                <NumericBox name='vx' value={this.props.drones[this.props.recentDroneID]['vx']} unit='m/s'/>
                                <NumericBox name='vy' value={this.props.drones[this.props.recentDroneID]['vy']} unit='m/s'/>
                                <NumericBox name='vz' value={this.props.drones[this.props.recentDroneID]['vz']} unit='m/s'/>

                                {/* <NumericBox name='battery temp' value={this.props.drones[this.props.recentDroneID]['battery_temp']} unit='&deg;C'/>
                                <NumericBox name='battery voltage' value={this.props.drones[this.props.recentDroneID]['battery_voltage']} unit='VOLT'/>
                                <NumericBox name='battery percent' value={this.props.drones[this.props.recentDroneID]['battery_percent']} unit='%'/> */}
                    
                                <div 
                                    class='state-info-box' 
                                    onClick={()=>this.props.mapCenteringHandle(!this.props.centering)}
                                    style={{cursor: "pointer"}}
                                >
                                    <p class='name'>CENTERING</p>
                                    <p class='value'>{this.props.centering ? "ON" : "OFF"}</p>
                                </div>

                            </div>
                            </>) : (null)}
                        </div>
                    ) : (null)
                }
            </>
        )
    }
}
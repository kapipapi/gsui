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

    RTL() {
        fetch("/drones/"+this.props.recentDroneID+"/rtl", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json"
            },
            body: {"mode": "RTL"}
        })
        .then(res => res.json())
        .then(message => {
            console.log(message.status)
        })
    }
    
    render() {
        return(
            <>
                {
                    this.state.show ? (
                        <div className='status-view'>
                            {this.props.recentDroneID > -1 ? (
                            <>
                            <h3 style={{textAlign: 'center', margin: '.5vw 0 0 0', padding: 0, color: "white"}}>{this.props.drones[this.props.recentDroneID]['name']}</h3><br/>
                            <div className='status-info-grid'>
                                <NumericBox name='lat' value={this.props.drones[this.props.recentDroneID]['lat']} unit='deg'/>
                                <NumericBox name='lon' value={this.props.drones[this.props.recentDroneID]['lon']} unit='deg'/>
                                <NumericBox name='rel alt' value={this.props.drones[this.props.recentDroneID]['rel_alt']} unit='m'/>
                                
                                <NumericBox name='vx' value={this.props.drones[this.props.recentDroneID]['vx']} unit='m/s'/>
                                <NumericBox name='vy' value={this.props.drones[this.props.recentDroneID]['vy']} unit='m/s'/>
                                <NumericBox name='vz' value={this.props.drones[this.props.recentDroneID]['vz']} unit='m/s'/>

                                <NumericBox name='velocity' value={this.props.drones[this.props.recentDroneID]['velocity']} unit='m/s'/>
                    
                                <div 
                                    className='state-info-box' 
                                    onClick={()=>this.props.mapCenteringHandle(!this.props.centering)}
                                    style={{cursor: "pointer"}}
                                >
                                    <p className='name'>CENTERING</p>
                                    <p className='value' style={{color: "blue"}}>{this.props.centering ? "ON" : "OFF"}</p>
                                </div>

                                <TextBox 
                                    name="system status"
                                    value={this.props.drones[this.props.recentDroneID]['sys_status']}
                                />

                                <TextBox 
                                    name="mode"
                                    value={this.props.drones[this.props.recentDroneID]['mode']}
                                />

                                <NumericBox name='voltage' value={this.props.drones[this.props.recentDroneID]['voltage_battery']} unit='V'/>
                                <NumericBox name='current' value={this.props.drones[this.props.recentDroneID]['current_battery']} unit='mA'/>
                                <NumericBox name='battery' value={this.props.drones[this.props.recentDroneID]['battery_remaining']} unit='%'/>

                                <div 
                                    className='state-info-box' 
                                    onClick={()=>this.RTL()}
                                    style={{cursor: "pointer"}}
                                >
                                    <p className='name'>RTL</p>
                                    <p className='value' style={{color: "red"}}>RTL</p>
                                </div>

                                <button onClick={()=>{console.log(this.props.drones[this.props.recentDroneID])}}>GET JSON</button>

                            </div>
                            </>) : (null)}
                        </div>
                    ) : (null)
                }
            </>
        )
    }
}
import React from 'react'
import StatusView from '../views/status/StatusView'
import './SideMenu.css'

export default class SideMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }

        this.toggleShow = this.toggleShow.bind(this)
        this.changeRecentDroneID = this.changeRecentDroneID.bind(this)
    }

    componentDidUpdate() {
        var select = document.getElementsByClassName('custom-select')[0]
        if(select) { select.value = this.props.recentDroneID }
    }

    toggleShow() {
        this.state.show ? this.setState({show: false}) : this.setState({show: true}); 
    }

    changeRecentDroneID(e) {
        this.props.recentDroneIDHandler(e.target.value)
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (
                    <>
                    <button className='side-menu-button' style={{top: '1vw', left: '26vw'}} onClick={this.toggleShow}>&#8592;</button>
                    <div className='side-menu'>

                        <select 
                            className="custom-select" 
                            onChange={this.changeRecentDroneID} 
                            onClick={this.props.getDroneListHandler}>
                            {Object.keys(this.props.drones).map((id, d)=>{
                                return(<option value={id}>{id+". "+this.props.drones[id].name}</option>)
                            })}
                        </select>

                        <StatusView 
                            drones={ this.props.drones }
                            recentDroneID={ this.props.recentDroneID }
                            centering={this.props.centering}
                            mapCenteringHandle={ this.props.mapCenteringHandle }
                        />

                    </div>
                    </>
                    ) : (<button className='side-menu-button' style={{top: '1vw', left: '1vw'}} onClick={this.toggleShow}>&#8594;</button>)
                } 
            </>
        )
    }
}
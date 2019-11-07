import React from 'react'
import StatusView from '../views/status/StatusView'
import './SideMenu.css'

export default class SideMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: true,
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
        this.props.stateHandler(e.target.value)
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (
                    <>
                    <button className='button' style={{top: '1vw', left: '31vw'}} onClick={this.toggleShow}>&#8592;</button>
                    <div class='side-menu'>

                        <select className="custom-select" onChange={this.changeRecentDroneID}>
                            <option value={-1}>hide</option>
                            {Object.keys(this.props.drones).map((id, d)=>{
                                return(<option value={id}>{id+". "+this.props.drones[id].name}</option>)
                            })}
                        </select>

                        <StatusView 
                            drones={ this.props.drones }
                            recentDroneID={ this.props.recentDroneID }
                        />

                    </div>
                    </>
                    ) : (<button className='button' style={{top: '1vw', left: '4vw'}} onClick={this.toggleShow}>&#8594;</button>)
                } 
            </>
        )
    }
}
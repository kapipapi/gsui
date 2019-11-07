import React from 'react'
import './ModeStatus.css'
import no_drone from './img/no_drone.svg'
import mode_manual from './img/mode_manual.svg'
import mode_automatic from './img/mode_automatic.svg'

export default class ModeStatus extends React.Component {

    constructor() {
        super()

        this.imgMode = this.imgMode.bind(this)
    }

    imgMode(m) {
        switch(m){
            case 'no_drone':
                return <img src={no_drone} alt='no drone'/>
            case 'mode_manual':
                return <img src={mode_manual} alt='manual mode'/>
            case 'mode_automatic':
                return <img src={mode_automatic} alt='automatic mode'/>
            default:
                return null
        }
    }

    render() {
        return(
            <div class='mode-status'>
                <p class='name'>{this.props.name}</p>
                {this.imgMode(this.props.value)}
            </div>
        )
    }

}
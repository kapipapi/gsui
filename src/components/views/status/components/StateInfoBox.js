import React from 'react'
import './StateInfoBox.css'

export default class StateInfoBox extends React.Component {

    render() {
        return(
            <div class='state-info-box'>
                <p class='name'>{this.props.name}</p>
                <p class='value'>{this.props.value}</p>
            </div>
        )
    }

}
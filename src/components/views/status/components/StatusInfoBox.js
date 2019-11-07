import React from 'react'
import './StatusInfoBox.css'
import NumberFormat from 'react-number-format'

export default class StatusInfoBox extends React.Component {

    render() {
        return(
            <div class='status-info-box'>
                <p class='name'>{this.props.name}</p>
                <p class='value'><NumberFormat value={this.props.value} displayType={'text'} decimalScale={2} /></p>
                <p class='units'>{this.props.unit}</p>
            </div>
        )
    }

}
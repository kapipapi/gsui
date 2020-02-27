import React from 'react'
import './NumericBox.css'
import NumberFormat from 'react-number-format'

export default class NumericBox extends React.Component {

    render() {
        return(
            <div className='status-info-box'>
                <p className='name'>{this.props.name}</p>
                <p className='value'><NumberFormat value={this.props.value} displayType={'text'} decimalScale={2} /></p>
                <p className='units'>{this.props.unit}</p>
            </div>
        )
    }

}
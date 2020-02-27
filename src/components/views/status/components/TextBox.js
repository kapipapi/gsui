import React from 'react'
import './TextBox.css'

export default class TextBox extends React.Component {

    render() {
        return(
            <div className='state-info-box'>
                <p className='name'>{this.props.name}</p>
                <p className='value' style={{fontSize: "1vw", marginTop: "35%"}}>{this.props.value}</p>
            </div>
        )
    }

}
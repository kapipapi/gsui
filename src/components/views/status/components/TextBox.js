import React from 'react'
import './TextBox.css'

export default class TextBox extends React.Component {

    render() {
        return(
            <div class='state-info-box'>
                <p class='name'>{this.props.name}</p>
                <p class='value'>{this.props.value}</p>
            </div>
        )
    }

}
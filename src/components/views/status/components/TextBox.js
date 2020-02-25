import React from 'react'
import './TextBox.css'

export default class TextBox extends React.Component {

    render() {
        return(
            <div class='state-info-box'>
                <p class='name'>{this.props.name}</p>
                <p class='value' style={{fontSize: "1vw", marginTop: "35%"}}>{this.props.value}</p>
            </div>
        )
    }

}
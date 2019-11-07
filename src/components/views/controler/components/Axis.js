import React from 'react'
import './Axis.css'

export default class Axis extends React.Component {
    render(){
        if(this.props.pressed){
            this.props.size+=10
        }
        return(
            <div id='ball_container' style={{
                    left: this.props.posx+"vw",
                    top: this.props.posy+"vw",
                    width: this.props.amplitude*2+"vw",
                    height: this.props.amplitude*2+"vw",
                    backgroundSize: this.props.amplitude*2+'vw',
            }}>
               x: {Math.floor(this.props.x*100)/100} <br/>
               y: {Math.floor(this.props.y*100)/100}
                <div id='ball' style={{
                    top: this.props.amplitude-this.props.ballSize/2+"vw",
                    left: this.props.amplitude-this.props.ballSize/2+"vw",
                    marginLeft: this.props.x*(this.props.amplitude-this.props.ballSize/2)+"vw",
                    marginTop: this.props.y*(this.props.amplitude-this.props.ballSize/2)+"vw",
                    width: this.props.ballSize+"vw",
                    height: this.props.ballSize+"vw"
                }}></div>
            </div>
        )
    }
}
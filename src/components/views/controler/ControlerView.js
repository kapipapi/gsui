import React from 'react'
import './ControlerView.css'
import Axis from './components/Axis'
import Buttons from './components/Buttons'

export default class ControlerView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            axes: [],
            buttons: [],
        }

        this.toggleShow = this.toggleShow.bind(this)
    }

    componentDidMount() {
        window.addEventListener("gamepadconnected", (e)=>{ this.handleGamepad(e, true) });
        window.addEventListener("gamepaddisconnected", (e)=>{ this.handleGamepad(e, false) });
    }

    toggleShow() {
        this.state.show ? this.setState({show: false}) : this.setState({show: true}); 
    }

    render() {
        return(
            <>
                {
                    this.state.show ? (
                        <div class='controler-view'>
                            <div class='close-button' onClick={this.toggleShow}>close</div>
                            <Buttons btns={this.state.buttons} />
                            <Axis id={0} x={this.state.axes[0]} y={this.state.axes[1]} posx={0} posy={0} ballSize={1} amplitude={5} />
                            <Axis id={1} x={this.state.axes[2]} y={this.state.axes[3]} posx={11} posy={0} ballSize={1} amplitude={5} />
                        </div>
                    ) : (
                    <div class='controler-view-opener' onClick={this.toggleShow}>
                        open Controler View
                    </div>)
                }
            </>
        );
    }
};
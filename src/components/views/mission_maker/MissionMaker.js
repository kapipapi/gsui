import React from 'react'

export default class MissionMaker extends React.Component {

    sendMessage() {

        let data = {
            "drone_id": 0,
            "lat": this.props.position[0],
            "lon": this.props.position[1],
        }
        console.log(data)
        fetch("/drones/0/go-to", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(message => {
            console.log(message)
        })
    }

    render() {
        return(
            <div>
                <button style={{fontSize: "2vmax",}} onClick={()=>{this.sendMessage()}}>&#9737;Go to</button>
            </div>
        )
    }
}
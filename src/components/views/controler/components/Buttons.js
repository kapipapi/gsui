import React from 'react'
import './Buttons.css'

class Buttons extends React.Component {

    makeTable() {

        var table = React.createElement('table', {className: 'buttons_table'},
        <tr><td>id</td><td>val</td></tr>,
        this.props.btns.map((btn, index)=>{
            return(<tr><td>{btn.id}</td><td>{btn.value}</td></tr>)
        }))
        
        return table
    }

    render(){
        return(
            <div id='buttons_table_container'>
                { this.makeTable() }
            </div>
        )
    }
}

export default Buttons
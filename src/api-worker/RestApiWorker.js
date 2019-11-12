 const getDroneList = () => {
    fetch("http://localhost:5000/drones", {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(json_data => {
        // let updated_list = JSON.parse(json_data)
        // console.log(json_data)
        // this.setState({drones: updated_list})
    })
}

export default getDroneList
import io from "socket.io-client"

const startDroneStatus = () => {
    let socket = io('ws://127.0.0.1:5000')
    // socket.emit('subscribe', {'drone_id': 0})
}

export default startDroneStatus
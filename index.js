const express = require('express')
const socket = require('socket.io')

// App setup
const app = express();
const server = app.listen(4000, () => {
    console.log('Running on port 4000')
})

// Static files
app.use(express.static('public'))

// Socket setup - listen for incomming connections
const io = socket(server)

io.on('connection', (socket) => {
    console.log('New socket connection established - id:', socket.id)

    socket.on('chat', (data) => {
        console.log(data.message)

        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

})

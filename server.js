const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})

app.use(express.static(__dirname + "/Public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


// socket 

const io = require("socket.io")(http)
io.on('connection', (socket) => {
    console.log("conected...")
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg)
    })
})


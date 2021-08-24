const express = require('express')
const app= express()
const http = require('http').createServer(app)



const PORT = process.env.PORT|| 5000



http.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}`)
})
app.use(express.static(__dirname,'/public'))


app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})

//socket.io set up in server.js
const io =require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('connected....') 

    //listen from client side
    socket.on('message' ,(msg)=>{
        //connected user need to return the message to client
       socket.broadcast.emit('message' , msg)
    })
})

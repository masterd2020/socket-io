const http = require('http');

const express = require('express');


const app = express();
const server = http.createServer(app)

const {Server} = require('socket.io');
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
  console.log(socket)
  console.log(`client connected}`)

  socket.on('chat-message', (msg) => {
    console.log('message: ' + msg);
  });
})

server.listen(2000, () => console.log('Now listening on port 2000'))
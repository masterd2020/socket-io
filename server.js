const http = require('http');

const express = require('express');


const app = express();
const server = http.createServer(app)

const {Server} = require('socket.io');
const io = new Server(server)

const check = require('./helper')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
  console.log(`client connected with id ${socket.id}`);
  console.log(socket)

  socket.on('chat-message', (data) => {
    const {type, message} = data;

    const res = check(type);

    io.emit('hello',data)
  });

  io.emit('test', {test: 'testing'})
})


server.listen(2000, () => console.log('Now listening on port 2000'))
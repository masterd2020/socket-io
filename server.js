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
  let selectedClient = []
  console.log(`client connected with id ${socket.id}`);

  socket.on('chat-message', (data) => {
    const {type, message} = data;

    // This holds all the user which notification want to be sent to
    const res = check(type);

    // REAL TIME NOTIFICATION
    /**
    * I think socket.io should be able to expose the express reqeust object as well as all what we have define on the request object.
    * e.g like the user object, which holds certain data about the logged in user
    */
    const user = socket.request.user
    if(user === type) selectedClient = [...selectedClient, socket.id]

    /**
    * Emitting real time notification to user the match the type provided from the frontend
    */
    for (let id in selectedClient) {
      io.to(selectedClient[id]).emit(message)
    }
  });

  io.emit('test', {test: 'testing'})
})


server.listen(2000, () => console.log('Now listening on port 2000'))
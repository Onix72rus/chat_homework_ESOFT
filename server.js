const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const messageObj = require ('./sourses/messages/messages');
const {userJoin, getCurrentUser, userLeave} = require ('./sourses/messages/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'Chat Bot';

io.on('connection', socket => {
   socket.on('joinRoom', ({username}) => {
      const user = userJoin(socket.id, username);

      socket.emit('message', messageObj(botName,'Welcome to CHAT'));

      socket.broadcast.emit('message', messageObj(botName,`${user.username} has joined the chat`));
   });



   socket.on('disconnect',() => {
      const user = userLeave(socket.id);

      if(user) {
         io.emit('message', messageObj(botName,`${user.username} has left the chat`));
      }

   });

   socket.on('ChatMessage', (msg) => {
      const user = getCurrentUser(socket.id);

      io.emit('message', messageObj(user.username, msg));
   });
});


app.use (express.static(path.join(__dirname, 'sourses')));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
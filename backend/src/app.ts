import express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';

import notifierFactory from "../src/lib/notifierFactory";

const port = 3000;
const app = express();
const server: http.Server = http.createServer(app);

const io: socketio.Server = new socketio.Server();
io.attach(server, {
  cors: {
    origin: ['http://localhost:8080']
  }
});

io.on('connection', async (socket) => {

  const notifier = notifierFactory();

  await notifier.init();

  notifier.receive(customMessageHandler);

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('notification', `server: ${msg}`);
  });

// io.on('connection', (socket: socketio.Socket) => {
//   console.log('connection');
//   socket.emit('status', 'Hello from Socket.io');
//   // socket.emit('connections', Object.keys(io.sockets.connected).length);

//   // socket.on('disconnect', () => {
//   //     console.log("A user disconnected");
//   // });

//   // socket.on('chat-message', (data) => {
//   //     socket.broadcast.emit('chat-message', (data));
//   // });

//   // socket.on('typing', (data) => {
//   //     socket.broadcast.emit('typing', (data));
//   // });

//   // socket.on('stopTyping', () => {
//   //     socket.broadcast.emit('stopTyping');
//   // });

//   // socket.on('joined', (data) => {
//   //     socket.broadcast.emit('joined', (data));
//   // });

//   // socket.on('leave', (data) => {
//   //     socket.broadcast.emit('leave', (data));
//   // });
// });


});

app.get('/', (req, res) => {
  res.send('Node notifier application!');
});

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

function customMessageHandler(message) {
  // console.log(`Via notificator received ${JSON.stringify(message)}`);
  io.emit('notification', message);
}

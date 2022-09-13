var app = require('express')();
var https = require('https');
var fs = require('fs');
var path = require('path');
var socketIO = require('socket.io');
const port = 3001;

const options = {
  key: fs.readFileSync(path.join(__dirname, './cert/private.pem')),
  cert: fs.readFileSync(path.join(__dirname, './cert/file.crt'))
}

const httpsServer = https.createServer(options, app);

var io = require('socket.io')(httpsServer, {
  cors: true
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('create or join', function (room) {
    log('Received request to create or join room ' + room);

    const clientsInRoom = io.sockets.adapter.rooms.get(room);

    const numClients = clientsInRoom ? clientsInRoom.size : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
    } else {
      log('Client ID ' + socket.id + ' joined room ' + room);
      // io.sockets.in(room).emit('join', room);
      socket.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      // io.sockets.in(room).emit('ready');
      socket.in(room).emit('ready');
    }
  });

  socket.on('ipaddr', function () {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function (details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function () {
    console.log('received bye');
  });

  // 适配多人会议功能
  // 进入一个room（群组）
  socket.on('join room', function (room) {
    const clientsInRoom = io.sockets.adapter.rooms.get(room);
    const numClients = clientsInRoom ? clientsInRoom.size : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    socket.in(room).emit('join', room);
    socket.join(room);
    socket.emit('joined', room, socket.id);
  })

  socket.on('join meeting', function (room) {
    const meetingRoom = `${room} meeting`;
    const clientsInRoom = io.sockets.adapter.rooms.get(meetingRoom);
    const numClients = clientsInRoom ? clientsInRoom.size : 0;

    if (numClients === 0) {
      socket.to(room).emit('new meeting', room);
      socket.join(meetingRoom);
      socket.emit('joined meeting', meetingRoom);
    } else {
      socket.join(meetingRoom);
      socket.to(meetingRoom).emit('new meeting member', {
        socketId: socket.id
      })
      socket.emit('joined meeting', meetingRoom);
    }
  })

  socket.on('message', function (message) {
    log('Client said: ', message);
    if (message.target) {
      console.log(`[${new Date().toLocaleTimeString()}] message ${message.type} send to ${message.target}`);

      socket.to(message.target).emit('message', message);
    } else {
      socket.broadcast.emit('message', message);
    }
  });
  // end

});



httpsServer.listen(port, function () {
  console.log(`listening on https://127.0.0.1:${port}`);
});
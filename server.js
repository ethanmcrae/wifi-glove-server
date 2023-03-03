const net = require('net');
const robot = require("robotjs");

const server = net.createServer((socket) => {
  console.log('client connected');

  socket.on('data', (data) => {
    const msg = data.toString();
    console.log('received data:', msg);
    robot.typeString(msg);
    socket.write('server response');
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.on('error', (err) => {
  console.error('server error:', err);
});

server.listen(3000, () => {
  // Command to determine public address: ifconfig | grep 'inet ' | grep -v 127.0.0.1
  console.log("listening on port 3000");
});

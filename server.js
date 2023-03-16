const net = require('net');
const robot = require("robotjs");

const clients = {};
const server = net.createServer((socket) => {
  // Remember the client
  const clientId = socket.remoteAddress; // Generate a unique ID for the client
  console.log('client ' + (clients[clientId] ? 're' : '') + 'connected')
  clients[clientId] = true; // Store the client ID in the object

  socket.on('data', (data) => {
    const msg = data.toString();
    console.log('received data:', msg);
    robot.typeString(msg);
    // socket.write('server response');
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });

  socket.on('error', (err) => {
    if (err.errno === -54) // Connection reset (bad wifi connection)
      console.log('Server/Client connection lost because of bad wifi');
    else
      console.error('Server error:', err);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(3000, () => {
  // Command to determine public address: ifconfig | grep 'inet ' | grep -v 127.0.0.1
  console.log("listening on port 3000");
});
// 
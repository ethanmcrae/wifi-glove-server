const WebSocket = require('ws');
const net = require('net');
const robot = require('robotjs');
const translate = require('./lib/translate');

const clients = {};
const picoServer = net.createServer((socket) => {
  // Remember the client
  const clientId = socket.remoteAddress; // Generate a unique ID for the client
  console.log(`Socket client ${clients[clientId] ? 're' : ''}connected: Pico`);
  clients[clientId] = true; // Store the client ID in the object

  socket.on('data', (data) => {
    const msg = data.toString();
    console.log('received data:', msg);
    const res = translate(msg);
    if (typeof res === 'string') {
      robot.typeString(res);
      clients.HTTP.send('[]');
    }
    else if (clients.HTTP) clients.HTTP.send(JSON.stringify(res));
    else console.log('Could not send data to HTTP client');
  });

  socket.on('end', () => {
    console.log('Socket client disconnected: Pico');
  });

  socket.on('error', (err) => {
    if (err.errno === -54) // Connection reset (bad wifi connection)
      console.log('Server/Pico connection lost because of bad wifi');
    else
      console.error('Server error:', err);
  });
});

picoServer.on('error', (err) => {
  console.error('Server error:', err);
});

/* ================================================================================ */
/* ================================================================================ */
/* ================================================================================ */
/* ================================================================================ */
/* ================================================================================ */

const httpServer = new WebSocket.Server({ port: 3001 }, () => {
  console.log('HTTP Websocket Server listening on port 3001')
});

httpServer.on('connection', (socket) => {
  // Remember the client
  const clientId = socket._socket.remoteAddress; // Generate a unique ID for the client
  console.log(`Socket client ${clients[clientId] ? 're' : ''}connected: HTTP`);
  clients[clientId] = socket; // Store the client ID in the object
  clients.HTTP = socket;

  socket.on('close', () => {
    console.log('Socket client disconnected: HTTP');
  });

  socket.on('error', (err) => {
    if (err.errno === -54) // Connection reset (bad wifi connection)
      console.log('Server/HTTP connection lost because of bad wifi');
    else
      console.error('Server error:', err);
  });
});

httpServer.on('error', (err) => {
  console.error('Server error:', err);
});


module.exports = picoServer;

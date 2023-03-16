const httpServer = require('./server-http');
const socketServer = require('./server-socket');

httpServer.listen(8080, () => {
  console.log('HTTP Server listening on port 8080');
});

socketServer.listen(3000, () => {
  // Command to determine public address: ifconfig | grep 'inet ' | grep -v 127.0.0.1
  console.log('Pico Websocket Server listening on port 3000\n');
});

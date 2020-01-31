const { serverConfig } = require('./config.js');
const StaticServer = require('static-server');
const server = new StaticServer(serverConfig);

server.start(() => {
  console.log('Starting server on port', serverConfig.port);
});

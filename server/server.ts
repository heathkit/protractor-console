import * as express from 'express';
import * as bodyParser from 'body-parser';
import { server as WebSocketServer } from 'websocket';
import * as http from 'http';
import { sendCommand, navigateTo } from './protractor-client';

// Navigate to a url on startup to inject the client-side recording script.
navigateTo('http://protractortest.org');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.post('/api/event', (req, res) => {
  res.send('got event');
  console.log(req.body);
  wsServer.broadcast(JSON.stringify(req.body));
});

app.post('/api/load', (req, res) => {
  let url = req.body.url;
  console.log('Navigating to url: ' + url);
  navigateTo(url).then((data) => {
    res.send({success: true, data: data});
  }).catch((err) => {
    res.send({success: false, err: err});
  })
});

app.post('/api/sendCmd', (req, res) => {
  console.log('Got command ' + req.body);
  console.log(req.body.script);
  sendCommand(req.body.script).then((data) => {
    console.log('Result')
    console.log(data);
    res.send({success: true, output: data});
  });
});

// TODO: Combine this with express using the proxy extension?
let server = http.createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
server.listen(8080, () => {
  console.log('Websocket server listening');
})

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true
});

wsServer.on('request', (request) => {
  let connection = request.accept('events');
  console.log((new Date()) + ' Connection accepted.');
  connection.on('close', (reasonCode, desc) => {
    console.log((new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.'));
  })
});

app.listen(3000, function() {
  console.log("Protractor console server listening on port %d in %s mode", 3000, app.settings.env);
});
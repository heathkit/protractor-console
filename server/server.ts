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
}

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true
});

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.post('/api/event', (req, res) => {
  res.send('got event');
  console.log(req.body);
});

app.post('/api/load', (req, res) => {
  let url = req.body.url;
  console.log('Navigating to url: ' + url);
  navigateTo(url).then((data) => {
    res.send({success: true, data: data});
  })
});

app.listen(3000, function() {
  console.log("Protractor console server listening on port %d in %s mode", 3000, app.settings.env);
});
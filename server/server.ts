import * as express from 'express';
import { sendCommand } from './protractor-client';

let app = express();

app.use(express.static('dist'));

app.get('/api/clientEvent', (req, res) => {
  res.send('got event');
});

app.get('/api/get', (req, res) => {
  sendCommand('browser.get("http://protractortest.org");').then((data) => {
    res.send({success: true, data: data});
  })
});

app.listen(3000, function() {
  console.log("Protractor console server listening on port %d in %s mode", 3000, app.settings.env);
});
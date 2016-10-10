import * as express from 'express';
import * as bodyParser from 'body-parser';
import { sendCommand } from './protractor-client';

let app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/clientEvent', (req, res) => {
  res.send('got event');
});

app.post('/api/load', (req, res) => {
  let url = req.body.url;
  console.log('Navigating to url: ' + url);
  sendCommand(`browser.get("${url}");`).then((data) => {
    res.send({success: true, data: data});
  })
});

app.listen(3000, function() {
  console.log("Protractor console server listening on port %d in %s mode", 3000, app.settings.env);
});
import * as express from 'express';

let proxy = require('express-http-proxy');

let app = express();

//app.use(express.static('dist'));
app.use('/', proxy('http://localhost:4200'));

app.get('/clientEvent', (req, res) => {

})

app.listen(3000, function() {
  console.log("Protractor console server listening on port %d in %s mode", 3000, app.settings.env);
})
import * as net from 'net';
import { Promise } from 'es6-promise';

const TIMEOUT = 60000;
const debugHost = '127.0.0.1';
const debugPort = 4242;

// A client to attach to Protractor's debugger server and exchange data.
export function sendCommand(cmd) {
  let socket;

  console.log("Executing command: " + cmd);
  return new Promise((resolve, reject) => {
    socket = net.connect({host: debugHost, port: debugPort}, () => {
      socket.write(cmd + '\r\n');

      let received = '';
      socket.on('data', (data) => {
        received += data.toString();
        var i = received.indexOf('\r\n');
        if (i >= 0) {
          var response = received.substring(0, i).trim();
          resolve(response);
        }
      });

      socket.on('error', (error) => {
        reject("Error from server: " + error);
      });
    });
  }).then(() => {
    socket.end();
  });
}

const relayScript = `
(function() {
function sendReq(url, data={}) {
  function reqListener () {
    console.log(this.responseText);
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener('load', reqListener);
  xmlhttp.open('POST', url);
  xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xmlhttp.send(JSON.stringify(data));
};
document.onclick = (e) => {
  let data = {
    'tagName': e.target.tagName,
    'id': e.target.id,
    'classList': e.target.classList,
    'linkText': e.target.text
  };
  console.log('Relaying click');
  console.log(e);
  sendReq('http://localhost:4200/api/event', data);
};
})();
`

export function navigateTo(url) {
  return sendCommand(`browser.get("${url}");`).then((data) => {
    console.log('executing script')
    let script = relayScript.replace(/\n/g, '');
    console.log(script);
    return sendCommand(`browser.executeScript("${script}")`)
    //return sendCommand(`browser.executeScript("alert('test')")`)
  }).then((result) => {
    console.log('Navigation result' + result);
  });
}

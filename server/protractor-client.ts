import * as net from 'net';

const TIMEOUT = 60000;
const debugHost = '127.0.0.1';
const debugPort = 4242;

// A client to attach to Protractor's debugger server and exchange data.
export function sendCommand(cmd) {
  let socket;

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

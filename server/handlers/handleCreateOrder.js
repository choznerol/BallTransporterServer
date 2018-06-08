const PythonShell = require("python-shell");

let pyshell = null;

module.exports = async function (clientId, ballColor, destinationColor, cb) {
  await console.log(clientId, ballColor, destinationColor);

  const options = {
    pythonPath: 'python3',
    args: ['--debug', 'BLUE'],
    scriptPath: './'
  }

  pyshell = new PythonShell('./ColorBallDetector.py', options)

  // get message back
  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) throw err;
    console.log('exit');
  });

  cb();
}
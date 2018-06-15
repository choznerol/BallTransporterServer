const PythonShell = require("python-shell");
const path = require("path");

const db = require("../service/db");
const libPath = path.resolve(__dirname, "../../lib");
// const scriptName = "ColorBallDetector.py";
const scriptName = "tryPythonShell.py";

let pyshell = null;

const dispatchOrder = async function(clientId, ballColor, destinationColor) {
  await console.log(clientId, ballColor, destinationColor);

  const options = {
    pythonPath: "python3",
    pythonOptions: ["-u"], // unbuffered：即時顯示 print 結果
    args: ["--debug", "BLUE"],
    scriptPath: libPath,
    mode: "json"
  };

  pyshell = new PythonShell(scriptName, options);

  // get message back
  pyshell.on("message", function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(`[${scriptName}] ${message.text}`);
    switch (message.payload) {
      case "START":
        console.log("START!!!");
        break;
      case "SUCCESS":
        console.log("SUCCESS!!!");
        break;
      default:
        throw new Error(`無效的 Payload: ${message.payload}`);
    }
  });

  // end the input stream and allow the process to exit
  pyshell.end(function(err, code, signal) {
    if (err) {
      throw err;
    }
  });
};

const cancelOrder = async () => {
  if (pyshell) {
    const { rows, fields } = await db.queryAsync("SELECT * FORM Clinet_info");
    pyshell.terminate();
  }
};

module.exports = dispatchOrder;

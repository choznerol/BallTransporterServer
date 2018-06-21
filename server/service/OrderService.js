const PythonShell = require("python-shell");
const path = require("path");

const db = require("../service/db");
const modulePath = path.resolve(
  __dirname,
  "../../modules/opencv-color-ball-transporter/"
);
const scriptName = "transporter.py";

const updateSendStatue = (id, status, ballColor) => {
  db.query(
    "UPDATE Client_info SET send_status = ?, color = ? WHERE id = ?",
    [status, ballColor, id],
    (err, results, fields) => {
      if (err) throw err;
      console.log("updateSendStatue -> ", results);
    }
  );
};

class OrderService {
  constructor() {
    this.pyshell = null;
  }

  async dispatchOrder(clientId, ballColor, destColor) {
    console.log(`dispatchOrder(${clientId}, ${ballColor}, ${destColor})`);

    const options = {
      pythonPath: "python3",
      pythonOptions: ["-u"], // unbuffered：即時顯示 print 結果
      args: [
        `--ball-color=${ballColor}`,
        `--dest-color=${destColor}`,
        `--tty-device=${process.env.TTY_DEVICE}`,
        "--debug"
      ],
      scriptPath: modulePath
      // mode: "json"
    };

    this.pyshell = new PythonShell(scriptName, options);

    updateSendStatue(clientId, 1, ballColor);

    // get message back
    this.pyshell.on("message", function(message) {
      console.log(`[${scriptName}] ${message}`);
    });

    this.pyshell.on("error", function(message) {
      console.log(`[${scriptName}] ${message}`);
      updateSendStatue(clientId, -1, ballColor);
    });

    // end the input stream and allow the process to exit
    // this.pyshell.end(function(err, code, signal) {
    //   if (err) throw err;
    // });
  }

  /** 終止 */
  cancelOrder(clientId) {
    if (!this.pyshell || this.pyshell.terminated) {
      console.log("cancelOrder(): No pyshell process running");
      updateSendStatue(clientId, 0, "NA");
      this.pyshell.terminate();
      return "NO_PROCESS";
    } else {
      updateSendStatue(clientId, 0, "NA");
      console.log("cancelOrder(): Success!");
      return "SUCCESS";
    }
  }
}

// module.exports = {
//   orderService: new OrderService()
// };

// 整個 App 只會有一個 OrderService 的 instance，因為必須共用一個 pyshell
const service = new OrderService();
module.exports = service;

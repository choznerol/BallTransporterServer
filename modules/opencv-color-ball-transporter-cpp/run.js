const { spawn } = require("child_process");
const path = require("path");

const run = (program, args, db, merchandise, clientId) => {
  const _args = args ? args.split(" ").map(arg => arg.toLowerCase()) : [];
  console.log(`$ ${path.resolve(__dirname, "./")}/${program} `);
  db.query(
    "UPDATE Client_info SET send_status = ?, color = ? WHERE id = ?",
    [1, merchandise, clientId],
    (err, results, fields) => {
      if (err) throw err;
      console.log(`已送出 ${clientId} 的訂單：${merchandise}`);
    }
  );

  const child = spawn(`${path.resolve(__dirname, "./")}/${program}`, _args);

  child.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  child.on("error", err => {
    db.query(
      "UPDATE Client_info SET send_status = ?, color = ? WHERE id = ?",
      [-1, merchandise, clientId],
      (err, results, fields) => {
        if (err) throw err;
        console.log(`客戶 ${clientId} 的訂單：${merchandise} 發生錯誤`);
      }
    );
    throw err;
  });

  child.on("close", code => {
    console.log(`child process exited with code ${code}`);
    db.query(
      "UPDATE Client_info SET send_status = ?, color = ? WHERE id = ?",
      [2, merchandise, clientId],
      (err, results, fields) => {
        if (err) throw err;
        console.log(`已完成 ${clientId} 的訂單：${merchandise}`);
      }
    );
  });
};

module.exports = run;

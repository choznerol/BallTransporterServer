const mysql = require("mysql");

const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE;

// 連結資料庫
const db = mysql.createConnection({ host, user, password, database });

db.connect(err => {
  const info = `使用者：${user}，密碼：${
    password ? password.replace(/./g, "*") : "未輸入（請檢查 .env）"
  }`;
  if (err) {
    console.error("連接資料庫失敗" + info);
    throw err;
  }
  console.log("成功連接資料庫" + info);
});

const updateSendStatue = (id, status) => {
  db.query(
    "UPDATE Client_info SET send_status = ? WHERE id = ?",
    [status, id],
    (err, results, fields) => {
      if (err) throw err;
      console.log("updateSendStatue -> ", results);
    }
  );
};

module.exports = db;

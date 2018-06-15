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

db.queryAsync = async sql => {
  await this.query(sql, (err, rows, fields) => {
    if (err) throw err;
    return { rows, fields };
  });
};

module.exports = db;

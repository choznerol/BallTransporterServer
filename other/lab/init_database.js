const mysql = require('mysql');

// 連結本地的 mysql 資料庫，並創建`company` database，包含一個`user` table
const user = 'pi';
const password = 'ladycarcar';
const host = 'localhost';
const database = 'company';

const tasks = [
  "DROP DATABASE IF EXISTS company;",
  "CREATE DATABASE company;",
  "USE company;",
  "CREATE TABLE Client_info (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), color INT(255), send_status INT(255));",
  "INSERT INTO Client_info(name, color, send_status) VALUES('Angela', 0, 0), ('Warren', 0, 0), ('Tobby', 0, 0), ('Tom', 0, 0), ('Johnson', 0, 0);"
];

// 連結資料庫
const conn = mysql.createConnection({ host, user, password, database });
conn.connect(err => {
  const info = `使用者：${user}，密碼：${password ? password.replace(/./g, "*") : "未輸入（請檢查 .env）"}`;
  if (err) {
    console.error('連接資料庫失敗' + info);
    throw err;
  }
  console.log('成功連接資料庫' + info);

  tasks.forEach(sql => {
    console.log(`執行: ${sql}`)
    conn.query(sql, (err, result) => {
      console.log(result)
    })
  })
});

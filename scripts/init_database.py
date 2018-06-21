import os
import pymysql

"""
連結本地的 mysql 資料庫，並創建 `company` database，包含一個 `user` table
"""

config = {
    'host': input('> 輸入 mysql 所在 host (預設 "127.0.0.1")：') or '127.0.0.1',
    'user': input('> 輸入 mysql 使用者名稱 (預設 "pi")：') or 'pi',
    'password': input('> 輸入使用者的密碼：'),
}

conn = pymysql.connect(**config)
cursor = conn.cursor()

tasks = [
    "DROP DATABASE IF EXISTS company;",
    "CREATE DATABASE company;",
    "USE company;",
    "CREATE TABLE Client_info (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), color VARCHAR(255), send_status INT(255));",
    "INSERT INTO Client_info(name, color, send_status) VALUES('Angela', 'NA', 0), ('Warren', 'NA', 0), ('Tobby', 'NA', 0), ('Tom', 'NA', 0), ('Johnson', 'NA', 0);"
]

for index, sql in enumerate(tasks):
    print('[{}/{}] 執行: {}'.format(index+1, len(tasks), sql))
    try:
        cursor.execute(sql)
        conn.commit()
    except:
        conn.rollback()
        conn.close()
        print('SQL執行失敗：{}'.format(sql))
        print('資料庫已回滾，即將退出...')
        exit(1)

conn.close()

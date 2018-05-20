# 🚧[WIP]🚧 BallTransporterServer
A node.js application that detects ball of specified color (via OpenCV) and transport it (via Arduino) to specified destination.

## Development

### 本機開發環境（以 macOS 10.12 為例）
0. `$ git clone https://github.com/choznerol/BallTransporterServer.git && cd ./BallTransporterServer`
1. 安裝 node.js 相關套件:
    ```
    $ yarn                           ＃ 或 npm install
    ```
2. 安裝 python 相關套件:
    ```
    $ sudo pip3 install pymysql
    ```
3. 在本機上 [安裝 MariaDB](https://mariadb.com/kb/en/library/installing-mariadb-on-macos-using-homebrew/) 並啟動
4. 連進資料庫，新增使用者 pi
    ```
    $ sudo mysql -u root

    > CREATE USER 'pi'@'localhost' IDENTIFIED BY <輸入 pi 的密碼>;
    > GRANT ALL PRIVILEGES ON *.* TO 'pi'@'localhost';
    > flush privileges;
    ```
5. 複製 `.env.template` 為 `.env`，在 `MYSQL_PASSWORD=` 後填入剛剛創建的 pi 的密碼
6. 起始（或重置）資料庫 'company'
    ```
    $ yarn init:database             ＃ 或 npm run init:database
    ```
    ![yarn init database](https://user-images.githubusercontent.com/12410942/40281339-30aab77a-5c93-11e8-8b56-fcc8041336b2.png)
7. 啟動 server，開始開發：
    ```
    $ yarn start                     # 或 npm run start
    ```
    成功的話依該會看到「成功連接資料庫」的提示：
    ![yarn start](https://user-images.githubusercontent.com/12410942/40281338-3073e088-5c93-11e8-99af-3a80ed8c4282.png)

    接著造訪後台 [localhost:3000/users](http://localhost:3000/users)，可以看到來自 MariaDB 的 `company.Client_info` 的資料：
    ![users](https://user-images.githubusercontent.com/12410942/40281337-3039806e-5c93-11e8-8103-91cba470c279.png)

    或啟動 server 並在修改檔案後自動 reload（需安裝 nodemon）
    ```
    $ yarn global add nodemon        # 或 npm install -g nodemon ，只要做一次
    $ yarn start:watch               # 或 npm run start:watch
    ```

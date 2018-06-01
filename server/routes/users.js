const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "SELECT * FROM Client_info";

  req.db.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("users", {
      rows,
      user: req.db.config.user
    });
  });
});


/**
 * Create new order for the user
 *
 * example:
 *   GET 192.168.X.X/users/2/create_order?merchandise=1&destination=2
 */
router.get(/\d+\/create_order/, function (req, res, next) {
  const { merchandise, destination } = req.query;

  if (!merchandise || !destination) {
    res.status(400).send('未提供 Query string `merchandise` 及 `destination`');
    console.error('未提供 Query string `merchandise` 及 `destination`');
  }

  const clientId = req.url.split('/')[1]
  res.send(`TODO: 嘗試為 User#${clientId} 建立訂單`)
})


/**
 * Get the sending status of order for the user
 *
 * example:
 *   GET 192.168.X.X/users/2/send_status
 */
router.get(/\d+\/send_status/, function (req, res, next) {
  const clientId = req.url.split('/')[1]
  const sql = `SELECT send_status FROM Client_info WHERE id = ${clientId}`

  req.db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    if (rows[0]) {
      res.send(rows[0]);
    } else {
      res.status(404).end();
    }
  });
})


/**
 * Cancel order for a client
 *
 * example:
 *   GET 192.168.X.X/users/2/cancel_order
 */
router.get(/\d+\/cancel_order/, function(req, res, next) {
  const clientId = req.url.split('/')[1]
  res.send(`TODO: 嘗試為 User#${clientId} 取消訂單`)
})

module.exports = router;

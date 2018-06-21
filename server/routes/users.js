const express = require("express");
const router = express.Router();
const handlers = require("../handlers");
const orderService = require("../service/OrderService");

/* GET users listing. */
router.get("/", function(req, res, next) {
  const sql = "SELECT * FROM Client_info";

  req.db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    res.render("users", {
      rows,
      user: req.db.config.user,
      userColor: ["BLUE", "RED", "GREEN", "YELLOW", "PURPLE"]
    });
  });
});

/**
 * Create new order for the user
 *
 * example:
 *   GET 192.168.X.X/users/2/create_order?merchandise=1&destination=2
 */
router.get(/\d+\/create_order/, async (req, res, next) => {
  const { merchandise, destination } = req.query;

  if (!merchandise || !destination) {
    res
      .status(400)
      .send("未提供 Query string `merchandise` 及 `destination`")
      .end();
  }

  const clientId = req.url.match(/\/(\d+)\/create_order/)[1];
  // 建立訂單
  await orderService.dispatchOrder(clientId, merchandise, destination);

  // 導向 send_status 查詢結果
  res.redirect(`user/${clientId}/send_status`);
});

/**
 * Get the sending status of order for the user
 *
 * example:
 *   GET 192.168.X.X/users/2/send_status
 */
router.get(/\d+\/send_status/, handlers.handleGetSendStatus);

/**
 * Cancel order for a client
 *
 * example:
 *   GET 192.168.X.X/users/2/cancel_order
 */
router.get(/\d+\/cancel_order/, (req, res, next) => {
  const clientId = req.url.split("/")[1];
  orderService.cancelOrder(clientId);
  res.send("OK");
});

module.exports = router;

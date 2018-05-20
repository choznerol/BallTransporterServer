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

module.exports = router;

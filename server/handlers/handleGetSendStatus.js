module.exports = function(req, res, next) {
  const clientId = req.url.split("/")[1];
  const sql = `SELECT send_status FROM Client_info WHERE id = ${clientId}`;

  req.db.query(sql, (err, rows, fields) => {
    if (err) throw err;

    if (!rows[0]) res.status(404).end();
    res.send(String(rows[0]["send_status"]));
  });
};

module.exports = function(req, res, next) {
  const clientId = req.url.split("/")[1];
  const sql = `SELECT send_status FROM Client_info WHERE id = ${clientId}`;

  let result;
  req.db.query(sql, (err, rows, fields) => {
    if (err) throw err;
    result = rows[0];
  });

  if (!result) res.status(404).end();
  res.send(result);
};

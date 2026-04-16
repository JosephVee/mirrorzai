const { Pool } = require('pg');

module.exports = async (req, res) => {
  const secret = req.query.secret || '';
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    res.status(401).send('<h1>Unauthorized</h1>');
    return;
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const result = await pool.query('SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 200');
    const rows = result.rows;
    let html = `<!doctype html><html><head><meta charset="utf-8"><title>Subscribers</title></head><body><h1>Subscribers</h1><table border="1" cellpadding="6"><tr><th>ID</th><th>Email</th><th>Created</th></tr>`;
    for (const r of rows) {
      html += `<tr><td>${r.id}</td><td>${r.email}</td><td>${r.created_at}</td></tr>`;
    }
    html += `</table></body></html>`;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Error</h1>');
  } finally {
    await pool.end();
  }
};

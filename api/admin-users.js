const { Pool } = require('pg');

module.exports = async (req, res) => {
  const secret = req.headers['x-admin-secret'] || req.headers['x-admin-secret'.toLowerCase()];
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const result = await pool.query(`SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 100`);
    res.status(200).json({ subscribers: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  } finally {
    await pool.end();
  }
};

import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT id, name, address, city, image FROM schools ORDER BY id DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
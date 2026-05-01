const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL 連線設定
const pool = new Pool({
  user: 'myuser',
  host: '35.212.185.147',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

// API 範例：取得所有使用者
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

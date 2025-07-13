const pool = require('../config/db');
const redis = require('../config/redisClient');
const {nanoid} = require('nanoid');

const SHORT_CODE_LENGTH = 6;

async function shortenUrl(longUrl) {
    const result = await pool.query('SELECT short_code FROM urls WHERE long_url = $1', [longUrl]);
  if (result.rows.length > 0) return result.rows[0].short_code;

  const shortCode = nanoid(SHORT_CODE_LENGTH);

  await pool.query('INSERT INTO urls (long_url, short_code) VALUES ($1, $2)', [longUrl, shortCode]);

  // Store in Redis for fast future lookup
  await redis.set(shortCode, longUrl);

  return shortCode;
}

async function getLongUrl(shortCode) {
  // Check Redis first
  const cachedUrl = await redis.get(shortCode);
  if (cachedUrl) return cachedUrl;

  // Fallback to DB
  const result = await pool.query('SELECT long_url FROM urls WHERE short_code = $1', [shortCode]);
  if (result.rows.length === 0) return null;

  const longUrl = result.rows[0].long_url;

  // Save in Redis for future hits
  await redis.set(shortCode, longUrl);

  return longUrl;
}

module.exports = { shortenUrl, getLongUrl };

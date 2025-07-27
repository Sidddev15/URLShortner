const { shortenUrl, getLongUrl } = require('../services/urlService');

async function createShortUrl(req, res) {
  const { longUrl } = req.body;
  const shortCode = await shortenUrl(longUrl);
  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
}

async function handleRedirect(req, res) {
  const { code } = req.params;
  const longUrl = await getLongUrl(code);
  if (!longUrl) return res.status(404).send('URL not found');
  res.redirect(longUrl);
}

module.exports = { createShortUrl, handleRedirect };
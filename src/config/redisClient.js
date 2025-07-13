const redis = require('redis');
const client = redis.createClient({
    socket:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});
client.connect();
client.on('error', err => console.error('Redis Error', err));

module.exports = client;
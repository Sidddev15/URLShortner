const { createClient } = require("@redis/client");
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

let alreadyConnected = false;
async function connectRedis() {
  if (!alreadyConnected) {
    await redisClient.connect();
    alreadyConnected = true;
    console.log("✅ Redis connected successfully");
  }
}

connectRedis();

module.exports = redisClient;

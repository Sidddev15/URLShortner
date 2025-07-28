const { createClient } = require("redis");

const redisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000), // optional: auto reconnect
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.on("connect", () =>
  console.log("✅ Redis connected successfully (Upstash)")
);

(async () => {
  await redisClient.connect();
})();

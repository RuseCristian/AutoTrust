// lib/redis.ts
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL, // Ensure this is set in your environment variables
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;

import type { Handler } from "@netlify/functions";
import { Redis } from "@upstash/redis";

// Initialize Redis with environment variables from Netlify
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = "presence:online";
const WINDOW_SEC = 120; // Consider user online if active within last 120 seconds (2 minutes)

/**
 * HEARTBEAT HANDLER
 * 
 * This function handles user presence tracking using Redis sorted sets.
 * 
 * HOW IT WORKS:
 * 1. Receives sessionId from client every 60 seconds
 * 2. Stores timestamp in Redis sorted set (key: presence:online)
 * 3. Removes stale entries older than 120 seconds
 * 4. Counts active users within 120-second window
 * 5. Returns current online count
 * 
 * Why 120s window with 60s heartbeat?
 * - Prevents false offline detection due to network delays
 * - Gives 2x buffer for missed heartbeats
 * - More reliable user experience
 */
export const handler: Handler = async (event) => {
  // CORS headers
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: cors, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    // Check if environment variables are set
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.error("Missing Redis environment variables");
      return {
        statusCode: 500,
        headers: cors,
        body: JSON.stringify({ 
          error: "Redis configuration missing. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Netlify environment variables." 
        })
      };
    }

    // Parse request body
    const { sessionId } = JSON.parse(event.body || "{}");
    
    if (!sessionId) {
      return { 
        statusCode: 400, 
        headers: cors, 
        body: JSON.stringify({ error: "sessionId is required" }) 
      };
    }

    const now = Math.floor(Date.now() / 1000);

    // Add/update user's timestamp in sorted set
    await redis.zadd(KEY, { score: now, member: sessionId });
    
    // Remove stale entries (older than WINDOW_SEC + 5 second buffer)
    await redis.zremrangebyscore(KEY, 0, now - (WINDOW_SEC + 5));
    
    // Count active users within the time window
    const count = await redis.zcount(KEY, now - WINDOW_SEC, "+inf");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...cors },
      body: JSON.stringify({ online: count }),
    };
  } catch (e: any) {
    console.error("Heartbeat error:", e);
    return { 
      statusCode: 500, 
      headers: cors, 
      body: JSON.stringify({ 
        error: e.message || "Internal server error",
        details: process.env.NODE_ENV === 'development' ? e.stack : undefined
      }) 
    };
  }
};

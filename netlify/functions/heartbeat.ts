import type { Handler } from "@netlify/functions";
import { Redis } from "@upstash/redis";

// Detect if running in local development
const IS_LOCAL = process.env.NETLIFY_DEV === "true" || process.env.NODE_ENV === "development";

// Initialize Redis only if not in local mode
const redis = IS_LOCAL ? null : new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = "presence:online";
const WINDOW_SEC = 120; // Consider user online if active within last 120 seconds (2 minutes)

// Local development mock storage
const localSessions = new Map<string, number>();

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
 * LOCAL DEVELOPMENT MODE:
 * - When running with 'netlify dev', uses in-memory storage instead of Redis
 * - Saves Redis API calls and costs during development
 * - Automatically detected via NETLIFY_DEV environment variable
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
    let count: number;

    // LOCAL DEVELOPMENT MODE - Use in-memory storage
    if (IS_LOCAL) {
      console.log("🔧 Running in LOCAL mode - using mock storage (no Redis calls)");
      
      // Update session timestamp
      localSessions.set(sessionId, now);
      
      // Remove stale entries
      for (const [sid, timestamp] of localSessions.entries()) {
        if (timestamp < now - WINDOW_SEC) {
          localSessions.delete(sid);
        }
      }
      
      // Count active sessions
      count = localSessions.size;
      
      console.log(`📊 Local sessions: ${count} online`);
    } 
    // PRODUCTION MODE - Use Redis
    else {
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

      if (!redis) {
        throw new Error("Redis client not initialized");
      }

      // Add/update user's timestamp in sorted set
      await redis.zadd(KEY, { score: now, member: sessionId });
      
      // Remove stale entries (older than WINDOW_SEC + 5 second buffer)
      await redis.zremrangebyscore(KEY, 0, now - (WINDOW_SEC + 5));
      
      // Count active users within the time window
      count = await redis.zcount(KEY, now - WINDOW_SEC, "+inf");
    }

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

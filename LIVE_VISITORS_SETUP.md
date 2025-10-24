# Live Visitor Count Setup Guide

This guide explains how to set up the live visitor tracking feature for Jobbo Cat using Upstash Redis and Netlify Functions.

## Architecture Overview

The system uses:
- **Upstash Redis** (free tier): A serverless Redis database for storing active visitor data
- **Netlify Functions**: Serverless functions to handle heartbeat and count requests
- **React Hook**: Custom hook to manage visitor tracking on the frontend

### How It Works

1. Each visitor gets a unique session ID stored in `sessionStorage`
2. The frontend sends a "heartbeat" every 15 seconds to confirm the user is still active
3. Redis stores each visitor with a timestamp in a sorted set
4. Stale entries (inactive >30 seconds) are automatically removed
5. The frontend fetches the current count every 5 seconds

## Setup Steps

### 1. Create Upstash Redis Database

1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up or log in
3. Click "Create Database"
4. Choose:
   - **Name**: jobbo-cat-visitors
   - **Type**: Regional (free tier)
   - **Region**: Choose closest to your users
5. Click "Create"
6. Copy your credentials:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 2. Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to **Site settings** → **Environment variables**
4. Add the following variables:
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
   ```

### 3. Local Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Upstash credentials in `.env`:
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
   ```

3. Install Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

4. Run development server with Netlify functions:
   ```bash
   netlify dev
   ```

### 4. Deploy to Netlify

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add live visitor tracking"
   git push
   ```

2. Netlify will automatically deploy your site with the functions

## API Endpoints

### POST /.netlify/functions/heartbeat
Registers/updates a visitor's presence.

**Request:**
```json
{
  "sessionId": "unique-session-id"
}
```

**Response:**
```json
{
  "online": 42
}
```

### GET /.netlify/functions/online-count
Gets the current count of online visitors.

**Response:**
```json
{
  "online": 42
}
```

## Usage in React Components

The `useOnlineCount` hook is already integrated into `WelcomePage.tsx`. To use it in other components:

```tsx
import { useOnlineCount } from '../hooks/useOnlineCount';

function MyComponent() {
  const { onlineCount, loading, error } = useOnlineCount({
    heartbeatInterval: 15000, // Optional: send heartbeat every 15s
    fetchInterval: 5000,      // Optional: fetch count every 5s
    enabled: true,            // Optional: enable/disable tracking
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{onlineCount} people online</div>;
}
```

## Configuration Options

### Time Windows
You can adjust the time windows in both function files:

```typescript
const WINDOW_SEC = 30; // Consider user online if active within last 30 seconds
```

### Intervals in Frontend
Adjust in the hook call:

```typescript
const { onlineCount } = useOnlineCount({
  heartbeatInterval: 15000, // How often to send heartbeat (ms)
  fetchInterval: 5000,      // How often to fetch count (ms)
});
```

## Troubleshooting

### Functions not working locally
- Make sure you're using `netlify dev` instead of `npm run dev`
- Check that `.env` file exists with correct credentials

### Low visitor count
- Check that heartbeat interval (15s) is less than window (30s)
- Verify CORS headers are correct
- Check browser console for errors

### Redis connection errors
- Verify environment variables are set correctly in Netlify
- Check Upstash dashboard for database status
- Ensure you're using REST URL/token, not native Redis URL

## Cost Considerations

**Upstash Free Tier Limits:**
- 10,000 commands per day
- 256 MB max database size

**Estimated Usage:**
- Each visitor: ~4 commands/minute (240/hour)
- 1,000 concurrent visitors: ~4,000 commands/minute
- Free tier supports ~40 concurrent visitors continuously

For higher traffic, upgrade to Upstash Pro plan.

## Security Notes

- Session IDs are random and don't contain personal information
- Data is automatically cleaned up after 30 seconds
- CORS is configured to allow all origins (adjust for production if needed)
- No sensitive user data is stored in Redis

## Next Steps

Consider adding:
- [ ] Analytics dashboard to track visitor patterns
- [ ] Category-specific visitor counts
- [ ] Geographic distribution of visitors
- [ ] Historical visitor data and trends

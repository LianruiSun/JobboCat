# Quick Start: Cloudflare Turnstile Setup

## What You Need to Do

### 1. Get Your Cloudflare Turnstile Site Key (5 minutes)

1. Go to https://dash.cloudflare.com
2. Sign up or log in
3. Navigate to **Turnstile** in the left sidebar (under Security)
4. Click **"Add Site"**
5. Fill in:
   - **Site name**: "Jobbo Cat Login" (or any name you prefer)
   - **Domain**: Add `localhost` (for development)
   - **Widget Mode**: Select "Managed"
6. Click **"Create"**
7. Copy your **Site Key** (it looks like: `0x4AAAAAAA...`)

### 2. Add the Site Key to Your Project

1. Open your `.env` file (create one from `.env.example` if you don't have it)
2. Add this line:
   ```
   VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
   ```
3. Replace `your_site_key_here` with the key you copied
4. Save the file

### 3. Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
# Then start it again:
npm run dev
```

### 4. Test It Out

1. Go to the login page
2. You should see the Turnstile verification widget appear
3. Try logging in - the widget should verify automatically or show a checkbox

## That's It! 🎉

The bot protection is now active on your login and signup forms.

---

## For Production Deployment

When deploying to production:

1. Go back to your Cloudflare Turnstile site
2. Add your production domain (e.g., `yourdomain.com`)
3. Add the site key to your production environment variables
4. Deploy!

---

## Need Help?

- See full documentation: `docs/CLOUDFLARE_TURNSTILE_SETUP.md`
- Check implementation details: `docs/CLOUDFLARE_IMPLEMENTATION.md`

## Testing During Development

If you want to test different scenarios, use these test keys:

- **Always passes**: `1x00000000000000000000AA`
- **Always fails**: `2x00000000000000000000AB`
- **Shows challenge**: `3x00000000000000000000FF`

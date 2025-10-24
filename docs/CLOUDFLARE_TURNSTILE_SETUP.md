# Cloudflare Turnstile Setup Guide

This guide will walk you through setting up Cloudflare Turnstile verification for login and signup forms in Jobbo Cat.

## What is Cloudflare Turnstile?

Cloudflare Turnstile is a free CAPTCHA alternative that provides bot protection without the frustrating image selection challenges. It uses privacy-preserving verification to distinguish between humans and bots.

## Setup Steps

### 1. Create a Cloudflare Account

1. Go to [Cloudflare](https://www.cloudflare.com/) and create a free account if you don't have one
2. Log in to your Cloudflare dashboard

### 2. Set Up Turnstile

1. Navigate to the Turnstile section in your Cloudflare dashboard:
   - Go to https://dash.cloudflare.com
   - Select your account
   - In the left sidebar, find "Turnstile" under the "Security" section

2. Click "Add Site" or "Create Site"

3. Configure your Turnstile site:
   - **Site name**: Give it a descriptive name (e.g., "Jobbo Cat Login")
   - **Domain**: Add your domain(s):
     - For development: `localhost`
     - For production: `yourdomain.com`
     - You can add multiple domains
   - **Widget Mode**: Choose "Managed" (recommended) for automatic difficulty adjustment
   - **Pre-Clearance**: Leave disabled unless you have specific requirements

4. Click "Create"

### 3. Get Your Site Key

After creating your Turnstile site, you'll see:
- **Site Key**: This is what you'll use in your frontend code (public)
- **Secret Key**: Keep this secure - used for server-side verification (if needed)

Copy the **Site Key**.

### 4. Configure Environment Variables

1. Copy the `.env.example` file to `.env` (if you haven't already):
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your Turnstile site key:
   ```bash
   VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
   ```

3. Save the file

### 5. Restart Your Development Server

If your development server is running, restart it to pick up the new environment variable:

```bash
npm run dev
```

## How It Works

### Frontend Implementation

The Turnstile widget has been integrated into:
1. **Login Form**: Users must complete verification before signing in
2. **Sign Up Form**: New users must complete verification before creating an account
3. **OAuth Sign In**: Verification is required before using Google sign-in

The verification widget appears automatically and adapts based on the user's behavior:
- Low-risk users may not see any challenge
- Medium-risk users might see a simple checkbox
- High-risk users might need to solve a challenge

### User Experience

- The Turnstile widget is displayed just above the submit button
- Users must complete the verification before the form can be submitted
- The verification token expires after a period, requiring re-verification
- If verification fails, an error message is displayed

### Password Reset

The password reset flow does NOT require Turnstile verification to ensure users can always recover their accounts even if there are issues with the verification system.

## Testing

### Development Testing

For development on localhost, Cloudflare Turnstile provides test keys that always pass:

- **Site Key**: `1x00000000000000000000AA` (Always passes)
- **Site Key**: `2x00000000000000000000AB` (Always blocks)
- **Site Key**: `3x00000000000000000000FF` (Forces interactive challenge)

You can use these for testing different scenarios.

### Production Testing

Before deploying to production:
1. Test the login flow with valid credentials
2. Test the signup flow
3. Test with different browsers and devices
4. Verify that error messages display correctly when verification fails

## Troubleshooting

### "Missing Cloudflare Turnstile site key" Error

- Make sure you've added `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` to your `.env` file
- Restart your development server after adding the environment variable
- Check that the `.env` file is in the root of your project

### Turnstile Widget Not Appearing

- Check the browser console for errors
- Verify that the Turnstile site key is correct
- Ensure your domain is added to the allowed domains in Cloudflare dashboard
- For localhost development, make sure `localhost` is in the allowed domains

### Verification Always Fails

- Check that you're using the correct site key (not the secret key)
- Verify your domain matches what's configured in Cloudflare
- Check the browser console for API errors

### "Verification failed. Please try again" Error

- The Turnstile API might be temporarily unavailable
- Network connectivity issues
- Browser extensions might be blocking the widget
- Try refreshing the page

## Security Considerations

### Client-Side vs Server-Side Verification

Currently, the implementation uses client-side verification only. For production applications, you should also verify the Turnstile token on the server side:

1. After the user submits the form, send the Turnstile token to your backend
2. Your backend should verify the token with Cloudflare's API
3. Only proceed with authentication if the token is valid

### Rate Limiting

Consider implementing additional rate limiting on your backend to prevent abuse even if Turnstile is bypassed.

### Secret Key Storage

Never expose your Turnstile secret key in frontend code. Only use it in server-side verification.

## Additional Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Widget Configuration](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
- [Server-Side Verification Guide](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)

## Support

If you encounter issues:
1. Check the Cloudflare Turnstile dashboard for analytics and error logs
2. Review the browser console for JavaScript errors
3. Check the Network tab in developer tools for API calls
4. Refer to Cloudflare's documentation and community forums

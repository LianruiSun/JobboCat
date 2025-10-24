# Authentication Guide - Jobbo Cat

Complete guide for authentication setup with email/password and Google OAuth.

---

## 📋 Features

- ✅ Email/password authentication
- ✅ Google OAuth (one-click sign in)
- ✅ Password reset functionality
- ✅ Email confirmation (optional)
- ✅ Secure session management

---

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Upstash Redis (for live visitor count)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### 2. Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Run the Application

```bash
npm install
netlify dev
```

Your app will be available at: `http://localhost:8888`

---

## 🔐 Email/Password Authentication

### Sign Up

Users can create accounts with:
- Email address
- Password (minimum 6 characters)
- Full name (optional)

### Sign In

Users sign in with their email and password.

### Password Reset

1. User clicks "Forgot password?"
2. Enters their email
3. Receives reset link via email
4. Clicks link to set new password

---

## 🔑 Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - URL: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or use existing)
   - Click project dropdown at top
   - Click "NEW PROJECT"
   - Project name: `Jobbo Cat`
   - Click "CREATE"

3. **Configure OAuth Consent Screen**
   - Navigate to: **APIs & Services** → **OAuth consent screen**
   - Select **External** user type
   - Click "CREATE"
   - Fill required fields:
     - App name: `Jobbo Cat`
     - User support email: your email
     - Developer contact: your email
   - Click "SAVE AND CONTINUE"
   - Add scopes: `email`, `profile`, `openid`
   - Click "SAVE AND CONTINUE"
   - Add test users (your email) for development
   - Click "SAVE AND CONTINUE"

4. **Create OAuth Client ID**
   - Navigate to: **APIs & Services** → **Credentials**
   - Click "CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Jobbo Cat Web Client`
   
5. **Add Redirect URIs**
   - Get your Supabase callback URL:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```
   - Under "Authorized redirect URIs", click "ADD URI"
   - Paste the callback URL
   - Click "CREATE"
   
6. **Save Credentials**
   - Copy **Client ID** (format: `xxxxx.apps.googleusercontent.com`)
   - Copy **Client Secret** (format: `GOCSPX-xxxxx`)

### Step 2: Configure Google OAuth in Supabase

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select your project

2. **Enable Google Provider**
   - Navigate to: **Authentication** → **Providers**
   - Find and expand **Google**
   - Toggle "Enable Sign in with Google" to **ON**

3. **Enter Credentials**
   - **Authorized Client ID**: Paste your Google Client ID
   - **Client Secret**: Paste your Google Client Secret
   - Click "Save"

4. **Configure Redirect URLs**
   - Navigate to: **Authentication** → **URL Configuration**
   - **Site URL**: `http://localhost:8888` (development)
   - **Redirect URLs**: Add these:
     ```
     http://localhost:8888/**
     http://localhost:8888/welcome
     ```
   - Click "Save"

### Step 3: Test Google OAuth

1. Start dev server: `netlify dev`
2. Go to login page
3. Click "Continue with Google" button
4. Authorize with your Google account
5. You should be redirected to the welcome page

---

## 🔧 Supabase Configuration

### Important Settings

**Authentication → Settings:**
- ✅ Enable Email Signup
- ✅ Enable Email Password
- ⚠️ Confirm Email: OFF (development) / ON (production)
- ❌ Automatically link accounts: OFF (prevents account linking issues)

**Authentication → Providers → Google:**
- ✅ Enable Sign in with Google: ON
- Client ID and Secret configured
- ❌ Skip nonce check: OFF

**Authentication → URL Configuration:**
- Site URL matches your domain
- Redirect URLs include your app URLs

---

## 🎯 How OAuth Works

```
User clicks "Continue with Google"
         ↓
App signs out any existing session (prevents account linking)
         ↓
Redirect to Google sign-in page
         ↓
User authorizes the app
         ↓
Google redirects to Supabase callback URL
         ↓
Supabase processes OAuth token
         ↓
Supabase redirects to /welcome
         ↓
User is logged in!
```

---

## 🐛 Troubleshooting

### Google OAuth Issues

**Error: "redirect_uri_mismatch"**
- **Fix**: Verify redirect URI in Google Console matches Supabase callback URL exactly
- Format: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

**Error: "This app isn't verified"**
- **Development**: Click "Advanced" → "Go to App (unsafe)"
- **Production**: Submit app for Google verification

**User stays on login page after OAuth**
- **Fix**: Check Supabase redirect URLs include your domain

### Email/Password Issues

**"Invalid login credentials"**
- Check email/password are correct
- Verify user confirmed their email (if required)

**"Email not confirmed"**
- User needs to check email inbox
- Click confirmation link
- Or disable email confirmation in Supabase for development

---

## 📱 Production Deployment

### Update Environment Variables

Set these in your hosting platform (Netlify, Vercel, etc.):

```bash
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
UPSTASH_REDIS_REST_URL=your_production_redis_url
UPSTASH_REDIS_REST_TOKEN=your_production_redis_token
```

### Update Google OAuth

1. **Google Cloud Console** → Your OAuth Client
2. Update **Authorized redirect URIs**:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
3. Update **Authorized JavaScript origins**:
   ```
   https://yourdomain.com
   ```

### Update Supabase

1. **Authentication** → **URL Configuration**
2. Update **Site URL**: `https://yourdomain.com`
3. Update **Redirect URLs**:
   ```
   https://yourdomain.com/**
   https://yourdomain.com/welcome
   ```

---

## 🔒 Security Best Practices

- ✅ Never commit `.env` file to git
- ✅ Use different OAuth apps for dev/production
- ✅ Enable email confirmation in production
- ✅ Regularly rotate OAuth secrets
- ✅ Monitor auth logs in Supabase dashboard
- ✅ Keep Supabase and dependencies updated

---

## 📚 Code Structure

### Authentication Files

```
src/
├── lib/
│   └── supabase.ts          # Supabase client & auth functions
├── context/
│   └── AuthContext.tsx      # React auth context & hooks
└── pages/
    └── LoginPage.tsx        # Login/signup UI
```

### Usage Example

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, signOut } = useAuth();
  
  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
  
  return <p>Please sign in</p>;
}
```

---

## ✅ Testing Checklist

- [ ] Email/password signup works
- [ ] Email confirmation received (if enabled)
- [ ] Email/password signin works
- [ ] Google OAuth button visible
- [ ] Google OAuth redirects correctly
- [ ] User logged in after Google auth
- [ ] User data accessible in app
- [ ] Sign out works correctly
- [ ] Password reset email received
- [ ] No console errors

---

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)

---

**Last Updated:** October 24, 2025  
**Authentication:** Email/Password + Google OAuth  
**Status:** Production Ready

# 🐱 Jobbo Cat

> You're Not Alone - A supportive community platform for job seekers

Jobbo Cat is a modern, beautiful web application designed to connect job seekers in a supportive community environment. See how many people are on the same journey, connect with others in your field, and share experiences in real-time chat rooms.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 👥 **Live Visitor Count** - See how many people are actively looking for jobs in real-time
- 🔐 **Secure Authentication** - Email/password and Google OAuth sign-in with bot protection
- 🛡️ **Bot Protection** - Cloudflare Turnstile verification for login and signup
- 🚪 **Lobby System** - Browse and join topic-based chat rooms
- 💬 **Real-time Chat** - Connect and communicate with others in your field
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎭 **Animated Cat Logo** - Delightful custom animations
- 🌈 **Category-based Rooms** - Technology, Design, Business, Marketing, Education, Healthcare, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Netlify CLI (for serverless functions)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/jobbo-cat.git
cd jobbo-cat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your credentials:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_CLOUDFLARE_TURNSTILE_SITE_KEY
# - UPSTASH_REDIS_REST_URL
# - UPSTASH_REDIS_REST_TOKEN
```

4. Start the development server
```bash
netlify dev
```

5. Open [http://localhost:8888](http://localhost:8888) in your browser

## 📚 Documentation

Detailed setup guides are available in the `docs/` folder:

- **[Authentication Guide](docs/AUTHENTICATION_GUIDE.md)** - Complete setup for email/password and Google OAuth
- **[Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md)** - Configure bot protection for login and signup
- **[Live Visitors Setup](docs/LIVE_VISITORS_SETUP.md)** - Configure real-time visitor counting with Upstash Redis

## �📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Routing:** React Router DOM

### Backend & Services
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Bot Protection:** Cloudflare Turnstile
- **Serverless Functions:** Netlify Functions
- **Live Visitor Count:** Upstash Redis
- **Deployment:** Netlify

## 📁 Project Structure

```
jobbo-cat/
├── docs/                    # Documentation
│   ├── AUTHENTICATION_GUIDE.md
│   ├── CLOUDFLARE_TURNSTILE_SETUP.md
│   └── LIVE_VISITORS_SETUP.md
├── netlify/
│   └── functions/           # Serverless functions
│       └── heartbeat.ts     # Live visitor tracking
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable components
│   │   ├── AnimatedCat.tsx
│   │   ├── Button.tsx
│   │   ├── CatLogo.tsx
│   │   ├── Header.tsx
│   │   ├── IntroAnimation.tsx
│   │   └── Turnstile.tsx
│   ├── context/             # React context providers
│   │   ├── AuthContext.tsx
│   │   └── NavigationContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useOnlineCount.ts
│   ├── lib/                 # Utilities
│   │   └── supabase.ts      # Supabase client
│   ├── pages/               # Page components
│   │   ├── WelcomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── LobbyPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── FeaturesPage.tsx
│   │   └── MainPage.tsx
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── netlify.toml             # Netlify configuration
└── package.json
```

## 🎨 Pages Overview

### Welcome Page
The landing page showcasing real-time count of active job seekers and allowing users to select their field of interest.

### Login Page
Secure authentication with:
- Email/password sign up and sign in
- Google OAuth (one-click login)
- Cloudflare Turnstile bot protection
- Password reset functionality

### Lobby Page
Browse available chat rooms by category, see member counts, and online users.

### Features & About Pages
Information about the platform and its features.

## 🔐 Authentication

Jobbo Cat uses **Supabase Auth** with:
- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ Cloudflare Turnstile bot protection
- ✅ Secure session management
- ✅ Password reset functionality

See [Authentication Guide](docs/AUTHENTICATION_GUIDE.md) and [Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md) for setup instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Security

- Never commit `.env` file or sensitive credentials
- Keep your Supabase keys secure
- Rotate OAuth secrets regularly
- Follow security best practices in production

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ and 🐱 for job seekers everywhere
</div>
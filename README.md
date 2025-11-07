# 🐱 Jobbo Cat# 🐱 Jobbo Cat



> You're Not Alone - A supportive community platform for job seekers> You're Not Alone - A supportive community platform for job seekers



Jobbo Cat is a modern, beautiful web application designed to connect job seekers in a supportive community environment. See how many people are on the same journey, connect with others in your field, and share experiences in real-time.Jobbo Cat is a modern, beautiful web application designed to connect job seekers in a supportive community environment. See how many people are on the same journey, connect with others in your field, and share experiences in real-time.



![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)



## ✨ Features## ✨ Features



- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations

- 👥 **Live Visitor Count** - See how many people are actively looking for jobs in real-time- 👥 **Live Visitor Count** - See how many people are actively looking for jobs in real-time

- 🔐 **Secure Authentication** - Email/password and Google OAuth sign-in- 🔐 **Secure Authentication** - Email/password and Google OAuth sign-in

- 🛡️ **Bot Protection** - Cloudflare Turnstile verification- 🛡️ **Bot Protection** - Cloudflare Turnstile verification

- 🐱 **Character Customization** - Create your own unique cat character- � **Character Customization** - Create your own unique cat character

- 👤 **User Profiles** - Personalized profiles with username and bio- � **User Profiles** - Personalized profiles with username and bio

- 💬 **Focus Sessions** - Track your productivity with focus timers- 💬 **Focus Sessions** - Track your productivity with focus timers

- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

- 🎭 **Animated Characters** - Delightful custom cat animations- 🎭 **Animated Characters** - Delightful custom cat animations

- 🌈 **Multi-language Support** - Available in multiple languages- 🌈 **Multi-language Support** - Available in multiple languages



## 🚀 Quick Start## 🚀 Quick Start



### For Users### For Users



Visit [Jobbo Cat](https://jobbocat.com) to start using the platform!Visit [Jobbo Cat](https://jobbocat.com) to start using the platform!



### For Developers### For Developers



**Prerequisites:****Prerequisites:**

- Node.js 16+ and npm- Node.js 16+ and npm

- Netlify CLI- Netlify CLI



**Installation:****Installation:**



```bash```bash

# 1. Clone the repository# 1. Clone the repository

git clone https://github.com/LianruiSun/JobboCat.gitgit clone https://github.com/LianruiSun/JobboCat.git

cd jobbo-catcd jobbo-cat



# 2. Install dependencies# 2. Install dependencies

npm installnpm install



# 3. Set up environment variables# 3. Set up environment variables

cp .env.example .envcp .env.example .env

# Edit .env with your credentials# Edit .env with your credentials



# 4. Start development server# 4. Start development server

netlify devnetlify dev

``````



Visit `http://localhost:8888` to see the app running locally.Visit `http://localhost:8888` to see the app running locally.



**⚠️ New Team Members:** See the `docs/` folder for detailed setup instructions, backend configuration, and project architecture.**⚠️ New Team Members:** See the `docs/` folder for detailed setup instructions, backend configuration, and project architecture.



## 📦 Build for Production## 📦 Build for Production



```bash```bash

npm run buildnpm run build

``````



The built files will be in the `dist` directory.The built files will be in the `dist` directory.



## 🛠️ Tech Stack## 📚 Documentation



- **Frontend:** React 18 + TypeScript + Tailwind CSSDetailed setup guides are available in the `docs/` folder:

- **Build Tool:** Vite

- **Authentication:** Supabase Auth (Email/Password + Google OAuth)- **[Authentication Guide](docs/AUTHENTICATION_GUIDE.md)** - Complete setup for email/password and Google OAuth

- **Database:** Supabase (PostgreSQL)- **[Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md)** - Configure bot protection for login and signup

- **Bot Protection:** Cloudflare Turnstile- **[Live Visitors Setup](docs/LIVE_VISITORS_SETUP.md)** - Configure real-time visitor counting with Upstash Redis

- **Serverless:** Netlify Functions

- **Real-time:** Upstash Redis## �📦 Build for Production

- **Deployment:** Netlify

```bash

## 📁 Project Structurenpm run build

```

```

jobbo-cat/The built files will be in the `dist` directory.

├── docs/                    # Internal documentation (not in git)

├── netlify/## 🛠️ Tech Stack

│   └── functions/           # Serverless functions

│       └── heartbeat.ts     # Live visitor tracking- **Frontend:** React 18 + TypeScript + Tailwind CSS

├── public/- **Build Tool:** Vite

│   ├── cats/                # Cat character assets- **Authentication:** Supabase Auth (Email/Password + Google OAuth)

│   ├── hats/                # Hat accessories- **Database:** Supabase (PostgreSQL)

│   ├── tables/              # Table backgrounds- **Bot Protection:** Cloudflare Turnstile

│   └── others/              # Other accessories- **Serverless:** Netlify Functions

├── src/- **Real-time:** Upstash Redis

│   ├── assets/              # Static assets- **Deployment:** Netlify

│   ├── components/          # React components

│   │   ├── animations/      # Animation components## 📁 Project Structure

│   │   ├── auth/            # Auth components (Turnstile)

│   │   ├── character/       # Character creator components```

│   │   ├── common/          # Shared UI componentsjobbo-cat/

│   │   ├── layout/          # Layout components (Header)├── docs/                    # Internal documentation (not in git)

│   │   └── lobby/           # Lobby-specific components├── netlify/

│   ├── context/             # React context providers│   └── functions/           # Serverless functions

│   │   ├── AuthContext.tsx│       └── heartbeat.ts     # Live visitor tracking

│   │   ├── CharacterContext.tsx├── public/

│   │   ├── LanguageContext.tsx│   ├── cats/                # Cat character assets

│   │   └── NavigationContext.tsx│   ├── hats/                # Hat accessories

│   ├── data/                # Mock data│   ├── tables/              # Table backgrounds

│   ├── hooks/               # Custom React hooks│   └── others/              # Other accessories

│   │   ├── useCatInteraction.ts├── src/

│   │   ├── useFocusSession.ts│   ├── assets/              # Static assets

│   │   ├── useOnlineCount.ts│   ├── components/          # React components

│   │   └── useOAuthRedirectHandler.ts│   │   ├── animations/      # Animation components

│   ├── lib/                 # Utilities & services│   │   ├── auth/            # Auth components (Turnstile)

│   │   ├── supabase.ts│   │   ├── character/       # Character creator components

│   │   └── profileService.ts│   │   ├── common/          # Shared UI components

│   ├── pages/               # Page components│   │   ├── layout/          # Layout components (Header)

│   │   ├── WelcomePage.tsx│   │   └── lobby/           # Lobby-specific components

│   │   ├── LoginPage.tsx│   ├── context/             # React context providers

│   │   ├── LobbyPage.tsx│   │   ├── AuthContext.tsx

│   │   ├── ProfilePage.tsx│   │   ├── CharacterContext.tsx

│   │   ├── ProfileSetupPage.tsx│   │   ├── LanguageContext.tsx

│   │   ├── AboutPage.tsx│   │   └── NavigationContext.tsx

│   │   └── FeaturesPage.tsx│   ├── data/                # Mock data

│   ├── types/               # TypeScript types│   ├── hooks/               # Custom React hooks

│   ├── App.tsx│   │   ├── useCatInteraction.ts

│   ├── main.tsx│   │   ├── useFocusSession.ts

│   └── index.css│   │   ├── useOnlineCount.ts

├── .env.example             # Environment template│   │   └── useOAuthRedirectHandler.ts

├── netlify.toml             # Netlify config│   ├── lib/                 # Utilities & services

└── package.json│   │   ├── supabase.ts

```│   │   └── profileService.ts

│   ├── pages/               # Page components

## 🎨 Key Features│   │   ├── WelcomePage.tsx

│   │   ├── LoginPage.tsx

### Authentication & Profiles│   │   ├── LobbyPage.tsx

- Email/password and Google OAuth sign-in│   │   ├── ProfilePage.tsx

- Cloudflare Turnstile bot protection│   │   ├── ProfileSetupPage.tsx

- User profiles with customizable username and bio│   │   ├── AboutPage.tsx

- Character creation and customization│   │   └── FeaturesPage.tsx

│   ├── types/               # TypeScript types

### Live Visitor Tracking│   ├── App.tsx

- Real-time count of active users│   ├── main.tsx

- Session-based tracking with Upstash Redis│   └── index.css

- Heartbeat system for active user detection├── .env.example             # Environment template

├── netlify.toml             # Netlify config

### Character System└── package.json

- Multiple cat designs to choose from```

- Customizable hats, tables, and accessories

- Character preview with canvas rendering## 🎨 Key Features

- Profile integration for persistent characters

### Authentication & Profiles

### Focus & Productivity- Email/password and Google OAuth sign-in

- Focus session tracking- Cloudflare Turnstile bot protection

- Daily session statistics- User profiles with customizable username and bio

- Pomodoro-style timer support- Character creation and customization



## 🤝 Contributing### Live Visitor Tracking

- Real-time count of active users

Contributions are welcome! Please feel free to submit a Pull Request.- Session-based tracking with Upstash Redis

- Heartbeat system for active user detection

**For Team Members:**

1. Read the `docs/` folder for project structure and setup### Character System

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)- Multiple cat designs to choose from

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)- Customizable hats, tables, and accessories

4. Push to the branch (`git push origin feature/AmazingFeature`)- Character preview with canvas rendering

5. Open a Pull Request- Profile integration for persistent characters



## ⚠️ Security### Focus & Productivity

- Focus session tracking

- Never commit `.env` file or sensitive credentials- Daily session statistics

- Keep your Supabase keys secure- Pomodoro-style timer support

- Rotate OAuth secrets regularly

- Follow security best practices in production## 🤝 Contributing



## 📝 LicenseContributions are welcome! Please feel free to submit a Pull Request.



This project is open source and available under the [MIT License](LICENSE).**For Team Members:**

1. Read the `docs/` folder for project structure and setup

---2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

<div align="center">4. Push to the branch (`git push origin feature/AmazingFeature`)

Made with ❤️ and 🐱 for job seekers everywhere5. Open a Pull Request

</div>

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
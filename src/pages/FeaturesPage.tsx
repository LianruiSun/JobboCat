import Header from '../components/Header';
import { useOnlineCount } from '../hooks/useOnlineCount';

export default function FeaturesPage() {
  const { onlineCount, loading } = useOnlineCount();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Powerful Features
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to connect, collaborate, and succeed in your job search journey
            </p>
          </div>

          {/* Live Stats */}
          <div className="card p-8 mb-16 text-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Live Right Now</span>
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2">
              {loading ? '...' : onlineCount.toLocaleString()}
            </div>
            <p className="text-slate-600">
              {loading ? 'Loading...' : `${onlineCount === 1 ? 'person is' : 'people are'} actively looking for opportunities`}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Real-time Presence */}
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Real-Time Presence</h3>
                  <p className="text-slate-600 leading-relaxed">
                    See exactly how many people are online and active right now. Know you're not alone 
                    in your journey with live visitor counts powered by Redis and Netlify serverless functions.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    Updates every 60 seconds
                  </div>
                </div>
              </div>
            </div>

            {/* Community Rooms */}
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Community Rooms</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Join field-specific rooms tailored to your industry. Connect with professionals 
                    in Technology, Design, Business, Marketing, Education, Healthcare, and more.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Tech', 'Design', 'Business', 'Marketing'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Real-Time Chat</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Instant messaging with other job seekers. Share experiences, ask questions, 
                    offer support, and build meaningful professional relationships in real-time.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Instant delivery
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Media sharing
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Privacy & Security</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Your privacy matters. Anonymous session tracking, secure data handling, 
                    and no personal information required to participate in the community.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Encrypted
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Anonymous
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Optimized */}
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Optimized architecture with serverless functions and Redis caching. 
                    93.75% reduction in API calls while maintaining real-time updates and responsiveness.
                  </p>
                  <div className="mt-4 text-sm font-medium text-amber-600">
                    ⚡ Supports 2,000+ concurrent users
                  </div>
                </div>
              </div>
            </div>

            {/* Early Adopter Recognition */}
            <div className="card p-8 hover:shadow-xl transition-shadow border-2 border-yellow-400">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Early Adopter Rewards 🎉</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Be part of the founding community! The first 10 members receive special recognition 
                    and early access to new features. Your feedback shapes the future of Jobbo Cat.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-yellow-600">
                    <span className="text-2xl">🏆</span>
                    First 10 get exclusive badges
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="card p-8 bg-slate-50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Built with Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="font-bold text-slate-900 mb-1">React 19</div>
                <div className="text-sm text-slate-600">Frontend Framework</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900 mb-1">TypeScript</div>
                <div className="text-sm text-slate-600">Type Safety</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900 mb-1">Netlify</div>
                <div className="text-sm text-slate-600">Serverless Functions</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900 mb-1">Upstash Redis</div>
                <div className="text-sm text-slate-600">Real-time State</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

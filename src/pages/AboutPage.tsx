import Header from '../components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About Jobbo Cat
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A community-driven platform connecting job seekers and fostering meaningful professional relationships
            </p>
          </div>

          {/* Mission Section */}
          <div className="card p-8 mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Job searching can be isolating and overwhelming. Jobbo Cat is built on the belief that 
              <span className="font-semibold text-emerald-600"> you're not alone</span> in your journey.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We create a space where job seekers can connect, share experiences, support each other, 
              and build meaningful professional relationships. Together, we make the job search journey 
              less daunting and more collaborative.
            </p>
          </div>

          {/* Creator Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet the Creator</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  LS
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Lianrui Sun</h3>
                <p className="text-emerald-600 font-medium mb-4">Full Stack Developer & Product Designer</p>
                
                <div className="space-y-4 text-slate-600">
                  <p>
                    A passionate developer with expertise in building scalable web applications and 
                    creating intuitive user experiences. Currently based in Canada, with a strong 
                    background in computer science and software engineering.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">Education:</span>
                      <span>Bachelor of Computer Science, University of Waterloo (Expected 2026)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">Skills:</span>
                      <span>React, TypeScript, Node.js, Python, Cloud Architecture, UI/UX Design</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-semibold min-w-[120px]">Experience:</span>
                      <span>Full Stack Development, Product Design, Community Building</span>
                    </div>
                  </div>

                  <p className="italic text-slate-500 border-l-4 border-emerald-500 pl-4 mt-6">
                    "Having experienced the challenges of job searching firsthand, I built Jobbo Cat 
                    to create the supportive community I wished existed. Let's navigate this journey together."
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://github.com/LianruiSun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="mailto:lianrui.sun@example.com"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Community First</h3>
              <p className="text-slate-600">Building authentic connections and supporting each other</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transparency</h3>
              <p className="text-slate-600">Open, honest communication and real-time visibility</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Empowerment</h3>
              <p className="text-slate-600">Providing tools and support for your success</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

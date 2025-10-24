export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Jobbo Cat
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#about"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#join"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Join
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-slate-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
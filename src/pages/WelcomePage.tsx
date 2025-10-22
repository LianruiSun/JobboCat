import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default function WelcomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    'Technology',
    'Design',
    'Business',
    'Marketing',
    'Education',
    'Healthcare',
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex items-center justify-center px-6 relative overflow-hidden pt-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>1,247 people looking for jobs right now</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          You're Not Alone
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          See how many people are in the same journey. Connect, share experiences, and support each other.
        </p>

        {/* CTA Section */}
        <div className="max-w-md mx-auto space-y-4">
          {/* Category Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-6 py-4 text-left shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span className={selectedCategory ? "text-slate-900" : "text-slate-500"}>
                {selectedCategory || 'Select your field'}
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 text-slate-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-10 animate-fade-in">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-slate-700 hover:bg-emerald-50 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enter Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => console.log('Entering lobby...')}
            className="shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join the Community
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
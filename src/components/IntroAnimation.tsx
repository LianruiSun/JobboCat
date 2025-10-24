import { useState, useEffect } from 'react';
import { useOnlineCount } from '../hooks/useOnlineCount';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [count, setCount] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const { onlineCount, loading } = useOnlineCount();
  const [targetCount, setTargetCount] = useState(0);

  // Update target count once data is loaded
  useEffect(() => {
    if (!loading && onlineCount > 0) {
      setTargetCount(onlineCount);
      setShowLoading(false);
    } else if (!loading && onlineCount === 0) {
      // If no count after loading, use a default or show error
      setTargetCount(1); // Default to showing "1 person online"
      setShowLoading(false);
    }
  }, [loading, onlineCount]);

  // Timeout fallback - if loading takes too long, show default count
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showLoading) {
        console.warn('Loading timeout - using default count');
        setTargetCount(1);
        setShowLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [showLoading]);

  useEffect(() => {
    // Don't start counting until we have the target count
    if (targetCount === 0) return;

    // Count up animation
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetCount / steps;
    let currentStep = 0;

    const countInterval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetCount);
        clearInterval(countInterval);
        
        // Wait a bit, then start zoom out
        setTimeout(() => {
          setIsZoomingOut(true);
          
          // Complete animation after zoom out
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 500);
      }
    }, duration / steps);

    return () => clearInterval(countInterval);
  }, [targetCount, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div
        className={`transition-all duration-700 ease-in-out ${
          isZoomingOut
            ? 'scale-50 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        <div className="text-center">
          {/* Icon/Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-8 shadow-2xl">
                <svg
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
          </div>

          {/* Counter with Loading State */}
          <div className="space-y-4">
            {showLoading ? (
              <>
                {/* Loading Animation */}
                <div className="relative">
                  <div className="text-7xl md:text-8xl font-extrabold text-slate-300 animate-pulse">
                    ---
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur-xl opacity-20 animate-pulse" />
                </div>
                <p className="text-2xl md:text-3xl font-semibold text-slate-500 animate-pulse">
                  Loading live count...
                </p>
              </>
            ) : (
              <>
                {/* Counter */}
                <div className="relative">
                  <div className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {count.toLocaleString()}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur-xl opacity-20 animate-pulse" />
                </div>
                
                <p className="text-2xl md:text-3xl font-semibold text-slate-700">
                  {targetCount === 1 ? 'person' : 'people'} online right now
                </p>

                {/* User Number Badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                  <span className="text-white font-bold text-lg">
                    You're #{targetCount}
                  </span>
                </div>

                {/* Special Message for First 10 Users */}
                {targetCount <= 10 && (
                  <div className="mt-4 px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl shadow-lg animate-pulse">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">🎉</span>
                      <span className="text-xl font-bold text-amber-700">
                        Early Adopter!
                      </span>
                      <span className="text-3xl">🎉</span>
                    </div>
                    <p className="text-amber-600 font-medium">
                      You're one of the first 10 members! Welcome to the community! 🚀
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-600">
                    Join the community
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

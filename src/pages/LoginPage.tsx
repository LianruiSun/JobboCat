import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { signIn, signUp, signInWithOAuth, resetPassword } = useAuth();
  const { navigateTo } = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (showForgotPassword) {
        // Handle password reset
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
        setEmail('');
      } else if (isSignUp) {
        // Handle sign up
        await signUp(email, password, { full_name: fullName });
        setSuccess('Account created! Please check your email to confirm.');
      } else {
        // Handle sign in
        await signIn(email, password);
        setSuccess('Signed in successfully!');
        // Navigate to welcome page after successful login
        setTimeout(() => navigateTo('welcome'), 1000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setError('');
    setSuccess('');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      // Sign out first to prevent linking OAuth to currently logged-in account
      await signInWithOAuth('google', true);
      // OAuth will redirect the user, so this won't execute
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {showForgotPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600">
              {showForgotPassword
                ? 'Enter your email to receive a reset link'
                : isSignUp
                ? 'Join the Jobbo Cat community'
                : 'Sign in to continue to Jobbo Cat'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg animate-fade-in">
              <p className="text-sm text-emerald-600">{success}</p>
            </div>
          )}

          <div className="card p-8 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field (Sign Up Only) */}
              {isSignUp && !showForgotPassword && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {!showForgotPassword && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              )}

              {!showForgotPassword && !isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth
                disabled={loading}
              >
                {loading ? 'Loading...' : showForgotPassword ? 'Send Reset Email' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>

              {showForgotPassword && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-sm text-center w-full text-emerald-600 hover:text-emerald-700"
                >
                  Back to Sign In
                </button>
              )}
            </form>

            {!showForgotPassword && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  size="md"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Continue with Google
                </Button>

                <p className="mt-6 text-center text-sm text-slate-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={handleModeSwitch}
                    className="font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up for free'}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
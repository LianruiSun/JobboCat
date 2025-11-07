import { useState } from 'react';
import { Header } from '../components/layout';
import { Button } from '../components/common/ui';

interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export default function MainPage() {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: '👩‍💻',
      content: 'Hey everyone! Just joined the Tech Professionals room.',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: '👨‍💼',
      content: 'Welcome! Feel free to ask any questions about web development.',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      avatar: '👩‍🎨',
      content: 'Has anyone tried the new React 19 features yet?',
      timestamp: '10:35 AM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 flex">
        <div className="w-full max-w-7xl mx-auto flex gap-6 p-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="card p-4 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Active Rooms
              </h2>
              
              <div className="space-y-2">
                {['Tech Professionals', 'Design Studio', 'Business Network'].map(
                  (room, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        index === 0
                          ? 'bg-emerald-100 text-emerald-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm">{room}</span>
                      </div>
                    </button>
                  )
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Online Members
                </h3>
                <div className="space-y-2">
                  {['Sarah Chen', 'Mike Johnson', 'Emily Rodriguez'].map(
                    (name, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm">
                          {name.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-600">{name}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="card p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Tech Professionals
                  </h1>
                  <p className="text-sm text-slate-600">42 members online</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="card flex-1 p-6 overflow-y-auto mb-4">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 animate-fade-in">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">
                        {msg.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-slate-900">
                          {msg.user}
                        </span>
                        <span className="text-xs text-slate-500">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-700">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="card p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!message.trim()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar - Info Panel */}
          <aside className="w-64 flex-shrink-0 hidden xl:block">
            <div className="card p-4 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Room Info
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Category
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    Technology
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Description
                  </p>
                  <p className="text-sm text-slate-600">
                    Connect with software developers, engineers, and tech
                    enthusiasts.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Quick Actions
                  </p>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" fullWidth>
                      View Members
                    </Button>
                    <Button variant="secondary" size="sm" fullWidth>
                      Room Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
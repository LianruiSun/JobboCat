import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default function LobbyPage() {
  const rooms = [
    {
      id: 1,
      name: 'Tech Professionals',
      members: 156,
      online: 42,
      category: 'Technology',
      description: 'Connect with software developers, engineers, and tech enthusiasts.',
    },
    {
      id: 2,
      name: 'Design Studio',
      members: 89,
      online: 23,
      category: 'Design',
      description: 'Share ideas and collaborate with creative designers.',
    },
    {
      id: 3,
      name: 'Business Network',
      members: 203,
      online: 67,
      category: 'Business',
      description: 'Network with entrepreneurs and business professionals.',
    },
    {
      id: 4,
      name: 'Marketing Hub',
      members: 134,
      online: 38,
      category: 'Marketing',
      description: 'Discuss strategies and trends in digital marketing.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Choose Your Room
            </h1>
            <p className="text-xl text-slate-600">
              Join a community that matches your interests and goals
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">582</p>
                  <p className="text-sm text-slate-600">Total Members</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <div className="h-3 w-3 rounded-full bg-teal-600 animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">170</p>
                  <p className="text-sm text-slate-600">Currently Online</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">1.2k</p>
                  <p className="text-sm text-slate-600">Messages Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="card p-6 hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {room.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {room.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{room.online} online</span>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">{room.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{room.members} members</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => console.log(`Joining room: ${room.name}`)}
                  >
                    Join Room
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Room Button */}
          <div className="mt-12 text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => console.log('Creating new room')}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              Create New Room
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
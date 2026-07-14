import React, { useState } from 'react';

// Mock Data
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Neon Vibes Summer Festival',
    organizer: 'SoundWave Productions',
    date: 'Aug 30, 2025',
    location: 'Miami Beach Amphitheater',
    category: 'Music Festival',
    ticketTypes: 3,
    capacity: 2000,
    minPrice: 79,
    status: 'Pending Review',
    color: 'from-violet-500 to-blue-500' // Placeholder gradient
  },
  {
    id: 2,
    title: 'Leadership & Innovation Summit',
    organizer: 'NextGen Corp',
    date: 'Sep 20, 2025',
    location: 'Chicago Convention Center',
    category: 'Business Conference',
    ticketTypes: 2,
    capacity: 500,
    minPrice: 299,
    status: 'Pending Review',
    color: 'from-blue-500 to-indigo-500' // Placeholder gradient
  }
];

export default function AdminEventApproval() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-xl z-10">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mr-3 shadow-lg">
            {/* Simple logo icon */}
          </div>
          <span className="font-bold text-lg tracking-wide">EventPass Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button className="w-full flex items-center px-4 py-3 text-white bg-gradient-to-r from-violet-600 to-blue-500 rounded-xl shadow-md transition-all">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Event Approvals</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white h-20 px-8 flex items-center justify-between border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Event Approval Queue</h1>
          <div className="px-3 py-1 bg-red-50 text-red-600 font-semibold text-sm rounded-full border border-red-100">
            3 Pending Review
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pending (3)
            </button>
            <button 
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'approved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Approved
            </button>
            <button 
              onClick={() => setActiveTab('rejected')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'rejected' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Rejected
            </button>
          </div>

          {/* Event List */}
          <div className="space-y-6">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-2xl border-2 border-yellow-50 shadow-sm hover:shadow-md transition-shadow flex gap-5">
                {/* Image Placeholder */}
                <div className={`w-36 h-36 rounded-xl bg-gradient-to-br ${event.color} shrink-0`}></div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                      <div className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-md">
                        {event.status}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-2 italic">
                      Organizer: {event.organizer} · {event.date} · {event.location}
                    </p>
                    
                    <p className="text-sm font-medium text-slate-700">
                      {event.category} · {event.ticketTypes} ticket types · {event.capacity} capacity · From ${event.minPrice}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 hover:bg-green-50 text-sm font-semibold rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>

                    <button className="px-4 py-2 bg-violet-50 text-violet-600 hover:bg-violet-100 text-sm font-semibold rounded-lg transition-colors ml-2">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

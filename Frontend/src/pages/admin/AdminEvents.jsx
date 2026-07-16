import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAdminData } from '../../hooks/useAdminData';
import { Check, X } from 'lucide-react';

const STATUS_STYLE = {
  approved: 'bg-green-100 text-green-700',
  pending:  'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-600',
};

export default function AdminEvents() {
  const { events, pendingEvents, loadingEvents, handleApproveEvent, handleRejectEvent } = useAdminData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = events.filter((e) => {
    const matchSearch = e.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout pendingCount={pendingEvents.length}>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <span className="text-sm text-slate-500">{events.length} total</span>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-64 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
          {['all','pending','approved','rejected'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition cursor-pointer ${
                statusFilter === s
                  ? 'bg-violet-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}>
              {s}
            </button>
          ))}
        </div>

        {loadingEvents ? (
          <div className="space-y-3">
            {[0,1,2].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100" />)}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left">Event</th>
                  <th className="px-6 py-3 text-left">Organizer</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800 line-clamp-1">{e.title}</p>
                      <p className="text-xs text-slate-400">{e.location}</p>
                    </td>
                    <td className="px-6 py-4">
                      {/* organizerId can be a populated object { _id, name, email }
                          or a plain string ID depending on the backend query */}
                      <p className="text-sm text-slate-700 font-medium">
                        {e.organizer?.name
                          ?? (typeof e.organizerId === 'object' ? e.organizerId?.name : null)
                          ?? '—'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {e.organizer?.email
                          ?? (typeof e.organizerId === 'object' ? e.organizerId?.email : null)
                          ?? ''}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{e.category}</td>
                    <td className="px-6 py-4 text-slate-600">${e.price}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[e.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {e.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApproveEvent(e._id)}
                            className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 cursor-pointer">
                            <Check size={12} /> Approve
                          </button>
                          <button onClick={() => handleRejectEvent(e._id)}
                            className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 cursor-pointer">
                            <X size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-slate-400">No events found.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

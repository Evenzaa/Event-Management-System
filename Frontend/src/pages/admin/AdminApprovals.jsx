import { Check, X, MapPin, Calendar, DollarSign } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useAdminData } from '../../hooks/useAdminData';

export default function AdminApprovals() {
  const { pendingEvents, loadingEvents, handleApproveEvent, handleRejectEvent } = useAdminData();

  return (
    <AdminLayout pendingCount={pendingEvents.length}>
      <div className="p-8">
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Pending Approvals</h1>
          {pendingEvents.length > 0 && (
            <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
              {pendingEvents.length}
            </span>
          )}
        </div>

        {loadingEvents ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0,1,2].map((i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-slate-100" />)}
          </div>
        ) : pendingEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-4xl">✅</p>
            <p className="mt-4 text-lg font-semibold text-slate-700">All caught up!</p>
            <p className="mt-1 text-sm text-slate-400">No events waiting for approval.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pendingEvents.map((e) => (
              <div key={e._id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                {e.images?.[0] && (
                  <img src={e.images[0]} alt={e.title}
                    className="h-40 w-full object-cover" loading="lazy" />
                )}
                <div className="p-5">
                  <p className="font-semibold text-slate-800 line-clamp-1">{e.title}</p>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">{e.description}</p>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} />{e.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {e.date ? new Date(e.date).toLocaleDateString() : '—'}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={12} />${e.price}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleApproveEvent(e._id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-50 py-2 text-sm font-semibold text-green-700 hover:bg-green-100 cursor-pointer">
                      <Check size={14} /> Approve
                    </button>
                    <button onClick={() => handleRejectEvent(e._id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 cursor-pointer">
                      <X size={14} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

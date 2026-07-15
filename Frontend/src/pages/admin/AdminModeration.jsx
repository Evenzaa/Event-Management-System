import AdminLayout from './AdminLayout';
import { useAdminData } from '../../hooks/useAdminData';

export default function AdminModeration() {
  const { pendingEvents } = useAdminData();
  return (
    <AdminLayout pendingCount={pendingEvents.length}>
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Moderation</h1>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl">🛡️</p>
          <p className="mt-4 text-lg font-semibold text-slate-700">Coming Soon</p>
          <p className="mt-1 text-sm text-slate-400">
            Moderation tools will appear here once the backend adds report/flag endpoints.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

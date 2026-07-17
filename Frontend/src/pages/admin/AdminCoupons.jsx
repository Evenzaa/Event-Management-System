import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAdminData } from '../../hooks/useAdminData';
import { Trash2, Plus } from 'lucide-react';

export default function AdminCoupons() {
  const { coupons, loadingCoupons, pendingEvents, handleCreateCoupon, handleDeleteCoupon } = useAdminData();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ code: '', discount: '', expiresAt: '' });

  const [confirmDelete, setConfirmDelete] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      code: formData.code.toUpperCase(),
      discount: Number(formData.discount),
      expiresAt: new Date(formData.expiresAt).toISOString(),
      isActive: true
    };
    
    const res = await handleCreateCoupon(payload);
    if (res.success) {
      setFormData({ code: '', discount: '', expiresAt: '' });
      setIsCreating(false);
    }
  };

  return (
    <AdminLayout pendingCount={pendingEvents.length}>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Coupons</h1>
            <span className="text-sm text-slate-500">{coupons.length} active coupons</span>
          </div>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700">
            <Plus size={16} /> New Coupon
          </button>
        </div>

        {isCreating && (
          <form onSubmit={onSubmit} className="mb-8 flex items-end gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-slate-500">CODE</label>
              <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder="SUMMER20" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm uppercase outline-none focus:border-violet-500 focus:bg-white" />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-slate-500">DISCOUNT (%)</label>
              <input required type="number" min="1" max="100" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="20" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-violet-500 focus:bg-white" />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-slate-500">EXPIRY DATE</label>
              <input required type="datetime-local" value={formData.expiresAt} onChange={e => setFormData({...formData, expiresAt: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-violet-500 focus:bg-white" />
            </div>
            <button type="submit" className="rounded-xl bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Save
            </button>
          </form>
        )}

        {loadingCoupons ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-left">Discount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {Array.isArray(coupons) && coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-800 uppercase">{c.code}</td>
                    <td className="px-6 py-4 font-medium text-violet-600">{c.discount}% OFF</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setConfirmDelete(c._id)} className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!coupons || coupons.length === 0) && (
              <p className="py-10 text-center text-sm text-slate-400">No coupons have been created yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Delete confirm modal tailored for coupons */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-2xl bg-white p-8 shadow-xl w-80 text-center">
            <p className="text-base font-bold text-slate-900">Delete this coupon?</p>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                Cancel
              </button>
              <button onClick={() => { handleDeleteCoupon(confirmDelete); setConfirmDelete(null); }}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
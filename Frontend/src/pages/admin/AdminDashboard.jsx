import { Users, CalendarDays, Ticket, DollarSign } from 'lucide-react';
import AdminLayout from './AdminLayout';
import StatCard from './components/StatCard';
import GrowthChart from './components/GrowthChart';
import TopCategories from './components/TopCategories';
import { useAdminData } from '../../hooks/useAdminData';

// Hardcoded until backend provides growth + category data
const GROWTH_DATA = [
  {value:30},{value:55},{value:40},{value:70},{value:48},{value:80},
  {value:75},{value:85},{value:78},{value:95},{value:88},{value:110},
];
const TOP_CATEGORIES = [
  { name:'Music & Concerts',  percent:38 },
  { name:'Tech Conferences',  percent:24 },
  { name:'Sports & Fitness',  percent:18 },
  { name:'Arts & Culture',    percent:12 },
  { name:'Food & Dining',     percent:8  },
];

function fmt(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export default function AdminDashboard() {
  const { stats, pendingEvents, loadingStats } = useAdminData();

  const CARDS = [
    { icon: Users,       value: fmt((stats?.users) + (stats?.organizers) + (stats?.admins)),    label: 'Total Users',    highlight: true  },
    { icon: CalendarDays,value: fmt(stats?.totalEvents),   label: 'Total Events',   iconColor: 'text-blue-500'   },
    { icon: Ticket,      value: fmt(stats?.totalBookings), label: 'Total Bookings', iconColor: 'text-emerald-500' },
    { icon: DollarSign,  value: stats?.totalRevenue ? `$${fmt(stats.totalRevenue)}` : '—',
      label: 'Total Revenue', iconColor: 'text-amber-500' },
  ];

  return (
    <AdminLayout pendingCount={pendingEvents.length}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
          {pendingEvents.length > 0 && (
            <span className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
              {pendingEvents.length} pending approval{pendingEvents.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Stat cards */}
        {loadingStats ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            {[0,1,2,3].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            {CARDS.map((c) => <StatCard key={c.label} {...c} />)}
          </div>
        )}

        {/* Chart + Categories */}
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl bg-white p-6">
            <h3 className="mb-6 text-base font-bold text-slate-800">Platform Growth</h3>
            <GrowthChart data={GROWTH_DATA} />
          </div>
          <TopCategories categories={TOP_CATEGORIES} />
        </div>
      </div>
    </AdminLayout>
  );
}

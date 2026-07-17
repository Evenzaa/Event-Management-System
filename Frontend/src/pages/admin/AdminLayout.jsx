import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarDays,
  CheckSquare, ShieldAlert, LogOut, Menu, X, Ticket
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',  to: '/admin',            icon: LayoutDashboard },
  { label: 'Users',      to: '/admin/users',       icon: Users },
  { label: 'Events',     to: '/admin/events',      icon: CalendarDays },
  { label: 'Approvals',  to: '/admin/approvals',   icon: CheckSquare },
  { label: 'Coupons',    to: '/admin/coupons',     icon: Ticket },
  { label: 'Moderation', to: '/admin/moderation',  icon: ShieldAlert },
];

export default function AdminLayout({ children, pendingCount = 0 }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const Sidebar = () => (
    <aside className="flex h-full w-60 flex-col bg-[#13111C] text-white">
      {/* Logo */}
      <Link to={"/"} className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500" />
        <div>
          <p className="text-sm font-bold leading-none">Evenzaa</p>
          <p className="text-[10px] text-violet-400">Admin Panel</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map(({ label, to, icon: Icon }) => {
          const isActive = pathname === to;
          return (
            <Link key={to} to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}>
              <Icon size={16} />
              {label}
              {label === 'Approvals' && pendingCount > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 px-3 py-4">
        <button onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 cursor-pointer">
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F7FF]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="cursor-pointer text-slate-600">
            <Menu size={20} />
          </button>
          <span className="font-bold text-slate-800">Evenzaa Admin</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

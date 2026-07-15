import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ChevronDown,
  User, Heart, Ticket, LayoutDashboard, LogOut,
  Search, LayoutGrid, CalendarPlus
} from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

/**
 * Nav links shown ONLY on the home page (/).
 * On all other pages the logo + auth section remain but links are hidden.
 * This keeps the header clean on inner pages (event listing, profile, etc.)
 * without needing a separate Navbar component.
 */
const HOME_NAV_LINKS = [
  { label: 'Explore Events',  to: '/event-listing',  icon: Search       },
  { label: 'Categories',      to: '/categories',     icon: LayoutGrid   },
  { label: 'For Organizers',  to: '/for-organizers', icon: CalendarPlus },
];

/** Dropdown menu items differ by role */
function userMenuItems(role) {
  const base = [
    { label: 'Edit Profile', to: '/profile',     icon: User },
    { label: 'Favourites',   to: '/favorites',   icon: Heart },
    { label: 'My Bookings',  to: '/my-bookings', icon: Ticket },
  ];
  if (role === 'organizer') {
    base.push({ label: 'Organizer Dashboard', to: '/organizer-dashboard', icon: LayoutDashboard });
  }
  if (role === 'admin') {
    base.push({ label: 'Admin Dashboard', to: '/admin', icon: LayoutDashboard });
  }
  return base;
}

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { pathname } = useLocation();

  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isHomePage = pathname === '/';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const menuItems = userMenuItems(user?.role);
  const initials  = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <Container className="flex h-16 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500" />
          <span className="text-lg">Evenzaa</span>
        </Link>

        {/* Desktop nav — home page only */}
        {isHomePage && (
          <nav className="hidden items-center gap-8 md:flex">
            {HOME_NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Desktop right side */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar trigger */}
              <button type="button" onClick={() => setIsDropdownOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 cursor-pointer">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
                  {initials}
                </span>
                <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                  {/* User info */}
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    {user?.role === 'organizer' && (
                      <span className="mt-1.5 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                        Organizer
                      </span>
                    )}
                    {user?.role === 'admin' && (
                      <span className="mt-1.5 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <ul className="py-1">
                    {menuItems.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                          <item.icon size={15} className="text-slate-400" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Logout */}
                  <div className="border-t border-slate-100 py-1">
                    <button type="button" onClick={logout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                Log In
              </Link>
              <Button as={Link} to="/signup" size="md">
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button type="button" className="cursor-pointer p-2 md:hidden"
          onClick={() => setIsMobileOpen((o) => !o)} aria-label="Toggle menu">
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">

            {/* Home nav links — mobile, home page only */}
            {isHomePage && HOME_NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                <link.icon size={15} />
                {link.label}
              </Link>
            ))}

            <div className={`${isHomePage ? 'mt-2 border-t border-slate-100 pt-3' : ''}`}>
              {isLoggedIn ? (
                <>
                  <div className="mb-2 flex items-center gap-3 px-3 py-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-xs capitalize text-slate-400">{user?.role}</p>
                    </div>
                  </div>

                  {menuItems.map((item) => (
                    <Link key={item.to} to={item.to}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                      <item.icon size={15} className="text-slate-400" />
                      {item.label}
                    </Link>
                  ))}

                  <button type="button" onClick={logout}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
                    <LogOut size={15} />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3 px-3">
                  <Link to="/login" className="text-sm font-semibold text-violet-600">Log In</Link>
                  <Button as={Link} to="/signup" size="sm">Get Started</Button>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
